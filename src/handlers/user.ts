import prisma from "../db";
import {compare_passwords, createJWT, hash_password} from "../modules/auth";

export const create_new_user = async (req, res) => {
    const hash = await hash_password(req.body.password);

    try {
        const user = await prisma.user.create({
            data: {
                username: req.body.username,
                password: hash,
            },
        });

        const token = createJWT(user);
        res.json({ token });
    } catch (e) {
        res.status(400);
        res.json({ message: "user exist " + e });
    }

};

export const sign_in = async (req, res) => {
     const user = await prisma.user.findUnique({
            where: {
                username: req.body.username
            }
        })

    if (! user) {
        res.status(400);
        res.json({message: "user not found MF"});
        return;
    }

    if (! await compare_passwords(req.body.password, user.password)) {
        res.status(401);
        res.json({message: "wrong password MF"});
        return
    } else {
        const token = createJWT(user);
        res.json({ token });
    }

}
