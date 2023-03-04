
import app from "./server";

const justLog = () => {
    console.log("booyah")
}

app.listen(3000, justLog)
