import { NowRequest, NowResponse } from "@vercel/node";

const sample_feed = `3lcpsnz5ewk2y2024-12-07 22:31:59
3lcpsmaukxc2y2024-12-07 22:31:00
3lcpnik3kb22h2024-12-07 20:59:27
3lcovop5nws2h2024-12-07 13:53:24
3lcokfy4ya22h2024-12-07 10:31:40
3lcnm7v2qy22h2024-12-07 01:31:23
3lcnlkmwpr22h2024-12-07 01:19:30
3lcnlggeprc2h2024-12-07 01:17:09
3lcngadjofk2h2024-12-06 23:44:16
3lcng2w3jvs2h2024-12-06 23:41:14
3lcncxiorxc2h2024-12-06 22:45:38
3lcncvwvya22n2024-12-06 22:44:46
3lcmuxddc722n2024-12-06 18:35:00
3lcmuhgbjqc2n2024-12-06 18:26:06
3lcmu77bxv22n2024-12-06 18:21:31
3lcm7yrmc3s272024-12-06 12:20:00
3lcm7rl5762272024-12-06 12:15:59
3lcm7fqgajk272024-12-06 12:09:21
3lckwglw5k22h2024-12-05 23:56:07
3lcjyi54j5k2h2024-12-05 15:00:06
3lcjwsatmyk2h2024-12-05 14:29:58
3lcjwmpskrc2h2024-12-05 14:26:53
3lcjwiobbe22h2024-12-05 14:24:37
3lcjwhxtljs2h2024-12-05 14:24:13
3lcireyz4ci2c2024-12-05 03:20:25
3lcib237b2r232024-12-04 22:27:59
3lciatjyj4s2x2024-12-04 22:24:19
3lciajnfety2c2024-12-04 22:18:47
3lciaclqu722m2024-12-04 22:14:51
3lcia4drhqb2r2024-12-04 22:11:21
3lci7i2egr32u2024-12-04 22:00:00
3lci5qhi6xx232024-12-04 21:28:55
3lchx3zhbwc2m2024-12-04 19:30:06
3lchjifrnfs272024-12-04 15:26:30
3lchj6m4b4k2i2024-12-04 15:21:01
3lchi2buck2272024-12-04 15:00:42
3lchhulscvk272024-12-04 14:57:31
3lcg5vksemc2u2024-12-04 02:26:27
3lcg5kvqt7k2u2024-12-04 02:20:29
3lcg4usgggk2j2024-12-04 02:08:07
3lcg4ge5eis2j2024-12-04 02:00:02
3lcg2iu3tas2j2024-12-04 01:25:39
3lcg2fn5q4k2j2024-12-04 01:23:51
3lcfxcqchjk2j2024-12-04 00:28:32
3lcfwq5jukk2j2024-12-04 00:18:09
3lcfqn5aqsc2j2024-12-03 22:29:05
3lcfoyqfh5c2j2024-12-03 21:59:47
3lceyk5e3cs272024-12-03 15:17:55
3lcev26u2ts252024-12-03 14:15:18
3lcdo2yra6k2j2024-12-03 02:37:50
3lcdjks27jk2j2024-12-03 01:17:11
3lcdekcc7pk262024-12-02 23:47:25
3lcdcgvbnlc262024-12-02 23:09:44
3lccsj5phok2v2024-12-02 18:24:40
3lccoetx5ks2v2024-12-02 17:10:40
3lccodw6sxc2v2024-12-02 17:10:09
3lccaahor6k272024-12-02 12:57:41
3lcbqihb3g2272024-12-02 08:15:49
3lcayzfxirs272024-12-02 01:15:48
3lcayj6ekbs272024-12-02 01:06:43
3lc7tjy4xmk272024-12-01 14:05:02
3lc7sqp2ji2272024-12-01 13:50:54
3lc7sh7ac5k272024-12-01 13:45:35
3lc7rruqzpc272024-12-01 13:33:39
3lc7ph3r6x2272024-12-01 12:51:50
3lc7p4f5tsc272024-12-01 12:45:51
3lc7lqhlfv22k2024-12-01 11:45:30
3lc7lp4rqrs2k2024-12-01 11:44:45
3lc6pfg7gic2k2024-12-01 03:18:14
3lc6pexs3s22k2024-12-01 03:17:59
3lc6pas7tgc2k2024-12-01 03:15:39
3lc6p2r5oas2k2024-12-01 03:12:17
3lc6frxwtrc2k2024-12-01 00:26:18
3lc6f2d3k6s2k2024-12-01 00:13:04
3lc6aiaijz22k2024-11-30 22:51:23
3lc66wcjjp22k2024-11-30 22:23:27
3lc66qxq3622k2024-11-30 22:20:28
3lc5x2khsbs2k2024-11-30 20:02:40
3lc5wxrgenc2k2024-11-30 20:01:06
3lc5wvwn6fk2k2024-11-30 20:00:05
3lc5wh6mbxc2k2024-11-30 19:51:50
3lc5wf3cj2k2k2024-11-30 19:50:39
3lc5cvmbkks2k2024-11-30 14:01:59
3lc53wudtk22k2024-11-30 11:57:25
3lc53sucq4k2k2024-11-30 11:55:11
3lc4x5xnz3s2i2024-11-30 10:31:55
3lc47c2jzi22i2024-11-30 03:24:42
3lc3rkoi5i22i2024-11-29 23:18:59
3lc3mj7pync2i2024-11-29 21:48:41
3lc3m5o7bzc2i2024-11-29 21:42:14
3lc3kzrs4f22i2024-11-29 21:22:10
3lc3kjdct422i2024-11-29 21:12:58
3lc3jyc7bqk2i2024-11-29 21:03:26
3lc3jp7e4nc2i2024-11-29 20:58:21
3lc3gnm7jz22i2024-11-29 20:03:46
3lc3gczffrc2i2024-11-29 19:57:51
3lc2eusjsns2i2024-11-29 09:59:20
3lc2etrisgs2i2024-11-29 09:58:46
3lc2erll2zc2i2024-11-29 09:57:32
3lc2c3ewjfs2i2024-11-29 09:09:20`.split("\n").map(s => ({ "post": "at://did:plc:tpkejgkmpl7xz322emd5lwy2/app.bsky.feed.post/" + s.replace(/2024-.+/, "") }));

export default function (req: NowRequest, res: NowResponse) {
    const limit = !Number.isNaN(req.limit*1) ? req.limit*1 : 50;
    if (req.cursor) {
        res.send({ "feed": [
            { "post": "at://did:plc:tpkejgkmpl7xz322emd5lwy2/app.bsky.feed.post/3lcpnik3kb22h" }
        ] });
    } else {
        res.send({
            "feed": sample_feed.slice(0, limit)
        });
    }
}
