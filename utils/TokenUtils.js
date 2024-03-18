import jwt from 'jsonwebtoken'

export const createTokenUser = (user) => {
    return {name: user.name, userId: user._id, role: user.role}
}

const createJwt = ({payload}) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME
    })
    return token;
}

export const isTokenValid = ({token}) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

export const setAuthCookiesToResponse = ({res, user}) => {

    const token = createJwt({payload: user})
    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production',
        signed: true,
    });
}