import { NowRequest, NowResponse } from "@vercel/node";

export default function GET(req: NowRequest, res: NowResponse) { 
    const { name, did, accounts } = req.query;
    if (!name && !did && !accounts) { 
        res.send({ error: "InvalidRequest", message: "could not find actor" });
        return;
    }
    return;
}