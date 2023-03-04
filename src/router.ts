
import {Router} from "express";
import prisma from "./db"
import {add_spending, get_latest_spendings, get_spending, update_spending} from "./handlers/spendings";

const router = Router();
// GET all spendings
router.get('/spendings', get_latest_spendings)

router.get('/spending/:id', get_spending)

router.post('/spending', add_spending)

router.put('/spending/:id', update_spending )
export default router
