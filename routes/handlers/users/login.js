const bcrypt = require('bcrypt');
const Validator = require('fastest-validator');
const v = new Validator()

const { user: User } = require('../../../models')


module.exports = async (req, res) => {
    const { email, password } = req.body
    const schema = {
        email: 'email|empty:false',
        password: 'string|empty:false ',
    }

    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        })
    }

    const findUser = await User.findOne({
        where: { email }
    })

    if (!findUser) {
        return res.status(404).json({
            status: 'error',
            message: 'user not found'
        })
    }

    const isValidPassword = await bcrypt.compare(password, findUser.password)

    if (!isValidPassword) {
        return res.status(400).json({
            status: 'error',
            message: 'password wrong'
        })
    }

    res.status(200).json({
        status: 'success',
        data: {
            id: findUser.id,
            name: findUser.name,
            email: findUser.email,
            role: findUser.role,
            avatar: findUser.avatar,
            profession: findUser.profession,
        }
    })
}