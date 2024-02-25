import {StatusCodes} from "http-status-codes";


export const createService = async (req, res) => {

    return res.status(StatusCodes.CREATED)
        .json({msg: 'Created'})
}