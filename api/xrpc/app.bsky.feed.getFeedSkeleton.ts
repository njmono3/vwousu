import { NowRequest, NowResponse } from "@vercel/node";

export default function (req: NowRequest, res: NowResponse) {
    res.send({
        "feed": [
            {
                "post": "at://did:plc:tpkejgkmpl7xz322emd5lwy2/app.bsky.feed.post/3lcev26u2ts25"
            },
            {
                "post": "at://294aria.bsky.social/app.bsky.feed.post/3lcck6d3dzc2w"
            }
        ]
    });
}
