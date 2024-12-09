import { NowRequest, NowResponse } from "@vercel/node";

export default function GET(req: NowRequest, res: NowResponse) { 
    res.json({ hoge: req.headers.get("Authorization"), fuga: process.env.BSKY_APP_PASSWORD });
    return;
}