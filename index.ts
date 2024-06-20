import { Response, Request } from "express";
import dotenv from "dotenv";
import express from "express"

dotenv.config();

const APP_PORT =process.env["APP_PORT"] ?? 3000;
const app = express();

app.use(express.json());

app.post('/github-events', (req: Request, res: Response) => {
    const body = req.body;
    const event = req.header('x-github-event');
    const {action, sender, repository} = body;

    const message = `${event}: ${sender.login} ${action} ${event} on ${repository.full_name}`;
    console.log(message);

    res.status(200).json({
        success: true
    });
});

app.listen(APP_PORT, () => {
    console.clear();
    console.log(`server en el puerto http://localhost:${APP_PORT}`);
    
});