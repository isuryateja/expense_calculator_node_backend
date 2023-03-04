import { body, validationResult } from "express-validator";

const handle_input = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400);
        res.json({ errors: errors.array() });
    } else{
        next();
    }
};
