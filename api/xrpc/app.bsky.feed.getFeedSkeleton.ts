import { NowRequest, NowResponse } from "@vercel/node";

const feed_seed = [
    { "post": "at://did:plc:tpkejgkmpl7xz322emd5lwy2/app.bsky.feed.post/3lcev26u2ts25" },
    { "post": "at://did:plc:itczn6fsreej3rh2w6lalz47/app.bsky.feed.post/3lcck6d3dzc2w" },
    { "post": "at://did:plc:jmuiqbywxznpru4snxj4qgkm/app.bsky.feed.post/3lclzxf5hrc2l" },
    { "post": "at://did:plc:jlzkhznd22kv75tfibmhtug3/app.bsky.feed.post/3lbzr23ppbc24" }
];

export default function (req: NowRequest, res: NowResponse) {
    const limit = !Number.isNaN(req.limit*1) ? req.limit*1 : 50;
    const original_feed = [...Array(100).keys()].map(i => feed_seed[i%feed_seed.length]);
    if (req.cursor) {
        res.send({
            "feed": original_feed.slice(0, limit)
        });
    } else {
        res.send({ "feed": [
            { "post": "at://did:plc:tpkejgkmpl7xz322emd5lwy2/app.bsky.feed.post/3lcpnik3kb22h" }
        ] })
    }
}
