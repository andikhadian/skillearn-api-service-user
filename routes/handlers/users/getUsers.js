const bcrypt = require('bcrypt');
const Validator = require('fastest-validator');
const v = new Validator()

const { user: User } = require('../../../models')

module.exports = async (req, res) => {
    const userIds = req.query.user_ids || []
    const sqlOptions = {
        attributes: ['id', 'name', 'email', 'profession', 'role', 'avatar']
    }

    if (userIds.length) {
        sqlOptions.where = {
            id: userIds
        }
    }

    const findUser = await User.findAll(sqlOptions)

    return res.status(200).json({
        status: 'success',
        data: findUser,
    })
}