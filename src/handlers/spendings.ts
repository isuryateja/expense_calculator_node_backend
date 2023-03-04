import prisma from "../db";
import {get_balance, get_spending_object, update_balance} from "./db_utils";

export const add_spending = async (req, res) => {
    const spending_data = get_spending_object(req.body);
    const result = await prisma.spending.create({ data: spending_data });
    const balance = await get_balance();
    const new_balance = balance - req.body.amount;
    await update_balance(new_balance);
    res.json({data: {...result, new_balance}});
}

export const get_latest_spendings = async (req, res) => {
    const spendings = await prisma.spending.findMany({
        take: 10,
        orderBy: {
            on: 'desc',
        }
    })
    res.json({data: spendings})
}

export const get_spending = async (req, res) => {
    const spending = await prisma.spending.findUnique({
        where: {
            id: req.params.id
        }
    })
    res.json({data: spending});
}

const update_spending_object = (body) => {
    let res= Object.create(null)
    if (body.amount) {
        res["amount"] = body.amount
    }
    if (body.comment) {
        res["amount"] = body.amount
    }
    if (body.for) {
        res["for"] = body.for
    }
    if (body.on) {
        res["on"] = body.on
    }
    return res;
}
export const update_spending = async (req, res) => {
    const spending = await prisma.spending.update({
        where: {
            id: req.params.id
        },
        data: update_spending_object(req.body)
    });
    res.json({data: spending})
}
