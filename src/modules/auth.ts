import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const SECRET = "testBook"

export const createJWT = (user) => jwt.sign( {id: user.id, username: user.username}, SECRET );

export const protect = (req, res, next) => {
    const bearer = req.headers.authorization;

    if(!bearer) {
        res.status(401);
        res.json({message: "no bearer token MF"});
        return
    }
    console.log(bearer);
    const [, token] = bearer.split(' ');
    if (! token) {
        res.status(401);
        res.json({message: "no token MF"});
        return
    }
    console.log("token: ", token)
    try {
        req.user = jwt.verify(token, SECRET);
        next();
    } catch (e) {
        console.error("error: ", e);
        res.status(401);
        res.json({message : "not a valid token"});
        return;
    }

}

export const compare_passwords = (pwd, hashed_pwd) => bcrypt.compare(pwd, hashed_pwd);

export const hash_password = (pwd) => bcrypt.hash(pwd, 5)
