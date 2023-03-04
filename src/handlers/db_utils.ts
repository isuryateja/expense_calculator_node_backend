import prisma from "../db";

export const get_spending_object = (body) => {
    let res = Object.create(null);
    res["for"] = body.for;
    res["amount"] = body.amount;
    res["comment"] = body.comment ?? body.for;
    return res;
}
export const get_balance = async () => {
    const bal_obj = await prisma.balance.findFirst({
        where: {
            type: "current"
        }
    });
    return bal_obj["balance"];
}

export async function update_balance(new_balance: number) {
    const res = await prisma.balance.updateMany({
        where: {
            type: "current"
        },
        data: {
            balance: new_balance
        }
    });
    console.log("updated balance: ", res)
}
