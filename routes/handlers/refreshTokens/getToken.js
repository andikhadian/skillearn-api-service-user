const {
    user: User,
    refreshToken: RefreshToken,
} = require('../../../models')

module.exports = async (req, res) => {
    const { refresh_token } = req.query

    console.log(refresh_token);

    const findToken = await RefreshToken.findOne({
        where: { token: refresh_token },
    })

    if (!findToken) {
        return res.status(400).json({
            status: 'error',
            message: 'invalid token'
        })
    }

    return res.status(200).json({
        status: 'status',
        data: findToken,
    })
}