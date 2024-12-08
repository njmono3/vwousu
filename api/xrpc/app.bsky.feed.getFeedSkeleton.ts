import { NowRequest, NowResponse } from "@vercel/node";

const feed_seed = `at://did:plc:szc2rdkyjimt3uvwps6k3gc2/app.bsky.feed.post/3kvy4pb5qki2j
at://did:plc:szc2rdkyjimt3uvwps6k3gc2/app.bsky.feed.post/3lc5kix27v224
at://did:plc:szc2rdkyjimt3uvwps6k3gc2/app.bsky.feed.post/3klnpfgfayv2c
at://did:plc:szc2rdkyjimt3uvwps6k3gc2/app.bsky.feed.post/3krl5aev2iu24
at://did:plc:szc2rdkyjimt3uvwps6k3gc2/app.bsky.feed.post/3kthuhkhjdc2x
at://did:plc:szc2rdkyjimt3uvwps6k3gc2/app.bsky.feed.post/3l7drn3wkea2g
at://did:plc:itczn6fsreej3rh2w6lalz47/app.bsky.feed.post/3l7uvqmw4bb24
at://did:plc:itczn6fsreej3rh2w6lalz47/app.bsky.feed.post/3kpzc3xbfgl23
at://did:plc:itczn6fsreej3rh2w6lalz47/app.bsky.feed.post/3knxixyghzw27
at://did:plc:itczn6fsreej3rh2w6lalz47/app.bsky.feed.post/3kn6pqp7iuc2f
at://did:plc:itczn6fsreej3rh2w6lalz47/app.bsky.feed.post/3lc2m7qyf3s2v
at://did:plc:s2dyveiilndircuiob4injub/app.bsky.feed.post/3lae26xqizx2h
at://did:plc:s2dyveiilndircuiob4injub/app.bsky.feed.post/3kwhy6cmvae2f
at://did:plc:a4abq6hauznvgpmj4qvclybt/app.bsky.feed.post/3kshcsl44hv2s
at://did:plc:mizsbz5a3lsdl2fz3ha7jrmd/app.bsky.feed.post/3kkxrs2uw6s2g
at://did:plc:mizsbz5a3lsdl2fz3ha7jrmd/app.bsky.feed.post/3lb4dc74gjc2a
at://did:plc:mizsbz5a3lsdl2fz3ha7jrmd/app.bsky.feed.post/3lc4tvmnft22u
at://did:plc:jmuiqbywxznpru4snxj4qgkm/app.bsky.feed.post/3lcpabrb4ok2r
at://did:plc:jmuiqbywxznpru4snxj4qgkm/app.bsky.feed.post/3l7t6iqz4cs2u
at://did:plc:jmuiqbywxznpru4snxj4qgkm/app.bsky.feed.post/3l7sxsm6ine23
at://did:plc:jmuiqbywxznpru4snxj4qgkm/app.bsky.feed.post/3l6zxcosxsl24
at://did:plc:jmuiqbywxznpru4snxj4qgkm/app.bsky.feed.post/3l6d37vvopd2r
at://did:plc:jmuiqbywxznpru4snxj4qgkm/app.bsky.feed.post/3lbnwmzu72k2f
at://did:plc:g3kuxfrrqt55c6tk4ju23db2/app.bsky.feed.post/3klvieciu522i
at://did:plc:uzelqdhwmhbcuv37dyexa75a/app.bsky.feed.post/3lago5jaj6j23
at://did:plc:ckyq324bohqubf5vgxdvkwnx/app.bsky.feed.post/3kkxf7x44qn2p
at://did:plc:ybdaethqnoqfpfzuxir7sbv6/app.bsky.feed.post/3l6tbyirdut25
at://did:plc:ybdaethqnoqfpfzuxir7sbv6/app.bsky.feed.post/3kksy5ylchp2h
at://did:plc:jmvkmo7fvhfw2idu7da5hr55/app.bsky.feed.post/3kktcd5hy6m2z
at://did:plc:2izshducesfujlj4msbopnts/app.bsky.feed.post/3kkteh4oekf2o
at://did:plc:3gmaf33pxbbrcslogjrl3lfu/app.bsky.feed.post/3knizamitml2l
at://did:plc:ic6u5b43d34lvefuujmke7eg/app.bsky.feed.post/3la6nk77tax2w
at://did:plc:ic6u5b43d34lvefuujmke7eg/app.bsky.feed.post/3l6r4crnuui2b
at://did:plc:tpkejgkmpl7xz322emd5lwy2/app.bsky.feed.post/3lcqer5wafs2p
at://did:plc:tpkejgkmpl7xz322emd5lwy2/app.bsky.feed.post/3lcqex7ukx22p
at://did:plc:tpkejgkmpl7xz322emd5lwy2/app.bsky.feed.post/3lcqexgmtts2p
at://did:plc:tpkejgkmpl7xz322emd5lwy2/app.bsky.feed.post/3lcqexpqnqc2p
at://did:plc:tpkejgkmpl7xz322emd5lwy2/app.bsky.feed.post/3lcpnik3kb22h
at://did:plc:tpkejgkmpl7xz322emd5lwy2/app.bsky.feed.post/3lbvm7fyysc25
at://did:plc:tpkejgkmpl7xz322emd5lwy2/app.bsky.feed.post/3lbl644qg3k2p`.split("\n").map(p => ({ "post": p }));


export default function (req: NowRequest, res: NowResponse) {
    const sample_feed = [...Array(Math.min(5, feed_seed.length))].map(_ => feed_seed.splice(Math.floor(Math.random() * feed_seed.length), 1)[0]);
    //res.send({limit: req.limit, cursor: req.cursor, feed: req.feed, rand: Math.random()});
    //return;"feed": sample_feed.slice(cursor, Math.min(cursor + limit, sample_feed.length))
    const limit = !Number.isNaN(req.limit*1) ? req.limit*1 : 50;
    const cursor = !Number.isNaN(req.cursor*1) ? req.cursor*1 : 0;
    res.send({
        //...(cursor + limit < sample_feed.length ? { "cursor": cursor + limit } : {}),
        //"feed": sample_feed.slice(cursor, Math.min(cursor + limit, sample_feed.length))
        "feed": sample_feed.slice(0, 30)
    });
}
