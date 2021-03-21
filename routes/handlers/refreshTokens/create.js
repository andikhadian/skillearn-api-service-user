const {
    user: User,
    refreshToken: RefreshToken,
} = require('../../../models')
const Validator = require('fastest-validator');
const v = new Validator

module.exports = async (req, res) => {
    const { user_id, refresh_token } = req.body
    const schema = {
        refresh_token: 'string',
        user_id: 'number',
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        })
    }

    const findUser = await User.findByPk(user_id)
    if (!findUser) {
        return res.status(404).json({
            status: 'error',
            message: 'user not found'
        })
    }

    const createdRefreshToken = await RefreshToken.create({ token: refresh_token, user_id })

    return res.status(200).json({
        status: 'success',
        data: {
            id: createdRefreshToken.id
        }
    })
}