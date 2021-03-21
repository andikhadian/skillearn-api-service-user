const bcrypt = require('bcrypt');
const Validator = require('fastest-validator');
const v = new Validator()

const { user: User } = require('../../../models')

module.exports = async (req, res) => {
    const { id } = req.params
    const { name, email, password, profession, avatar } = req.body
    const schema = {
        name: 'string|empty:false',
        email: 'email|empty:false',
        password: 'string|empty:false|min:6',
        profession: 'string|optional',
        avatar: 'string|optional',
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate,
        })
    }

    const findUser = await User.findByPk(id);

    if (!findUser) {
        return res.status(404).json({
            status: 'error',
            message: 'user not found'
        });
    }

    if (email) {
        const checkEmail = await User.findOne({
            where: { email }
        })

        if (checkEmail && email !== findUser.email) {
            return res.status(400).json({
                status: 'error',
                message: 'email already exist'
            })
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await findUser.update({
        name,
        email,
        password: hashedPassword,
        profession,
        avatar,
    })

    return res.status(200).json({
        status: 'success',
        data: {
            id: findUser.id,
            name: findUser.name,
            email: findUser.email,
            profession: findUser.profession,
            avatar: findUser.avatar,
        }
    })




    
}