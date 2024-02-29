import {Unauthenticated} from "../errors/Unauthenticated.js";
import {isTokenValid} from "../utils/TokenUtils.js";
import {Unauthorized} from "../errors/Unauthorized.js";


export const authenticateUser = async (req, res, next) => {
    const token = req.signedCookies.token
    if (!token) {
        throw new Unauthenticated('Invalid authentication')
    }
    try {
        const {name, userId, role} = isTokenValid(token)
        req.user = {name, userId, role}
    } catch (error) {
        throw new Unauthenticated('Invalid authentication')
    }
}

export const authorizePermissions = (...roles) => {

    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new Unauthorized('Unauthorized to access this route')
        }
        next()
    }
}