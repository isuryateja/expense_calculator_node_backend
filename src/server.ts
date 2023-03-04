import express from 'express'
import morgan from "morgan"
import router from "./router";
import cors from "cors";
import {protect} from "./modules/auth";
import {create_new_user, sign_in} from "./handlers/user";
// import

const app = express();

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.status(200);
    res.json({message: "hello"});

})

// app.use('/api', protect, router);
app.use('/api', router);
app.post('/user', create_new_user);
app.post('/signin', sign_in);

export default app;
