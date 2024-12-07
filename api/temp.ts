import { NowRequest, NowResponse } from "@vercel/node";

export default function (req: NowRequest, res: NowResponse) {
    res.send({ hoge: 0, ...req.query });
}