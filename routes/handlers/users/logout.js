const bcrypt = require('bcrypt');
const Validator = require('fastest-validator');
const v = new Validator()

const { user: User, refreshToken: RefreshToken } = require('../../../models')


module.exports = async (req, res) => {
    const { user_id } = req.body

    const findUser = await User.findByPk(user_id);

    if (!findUser) {
        return res.status(404).json({
            status: 'error',
            message: 'user not found'
        })
    }

    await RefreshToken.destroy({
        where: { user_id }
    })

    return res.status(200).json({
        status: 'success',
        message: 'refresh token deleted'
    })
}