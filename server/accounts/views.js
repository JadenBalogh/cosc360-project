import {findUser} from "./dao.js";
import {encodeToken} from "./authentication.js";

export async function login(req, res) {
    const {email, password} = req.body;
    const user = findUser(email, password);

    if (!user) {
        res.status(401);
        return res.json({error: 'Invalid email or password'});
    }

    const accessToken = encodeToken({userId: user.id});
    return res.json({accessToken});
}

export async function signup(req, res) {
    const {email, password, username} = req.body;
    const user = findUser(email, null);

    if (user) {
        res.status(400);
        return res.json({error: 'An account associated to this email already exists'})
    }

    // TODO actually create the user and save it in db
    res.status(200);
    return res.json("success");
}
