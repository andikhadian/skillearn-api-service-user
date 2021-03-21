const bcrypt = require('bcrypt');
const Validator = require('fastest-validator');
const v = new Validator()

const { user: User } = require('../../../models')

module.exports = async (req, res) => {
    const { id } = req.params

    const findUser = await User.findByPk(id, {
        attributes: ['id', 'name', 'email', 'profession', 'role', 'avatar']
    })

    if (!findUser) {
        return res.status(400).json({
            status: 'error',
            message: 'user not found'
        })
    }

    return res.status(200).json({
        status: 'success',
        data: findUser,
    })
}