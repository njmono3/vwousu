import { NowRequest, NowResponse } from "@vercel/node";

const vwousu_did = process.env.ATPROTO_DID;

export default function GET(req: NowRequest, response: NowResponse) { 
    const { name, did, accounts } = req.query;
    const id = { name, did, accounts };
    if (!name && !did && !accounts) { 
        response.send({ error: "InvalidRequest", message: "could not find actor" });
        return;
    }
    readStoredActors(id)
        .then(res => {
            if (res.length) {
                response.send(res[0]);
            } else {
                response.send({ message: "target is not found" });
            }
        });
    return;
}

function readStoredActors(id, prev_res = { cursor: "no", records: [] }) {
    const return_promise =
        fetchStoredActors(prev_res.cursor)
            .then(res => {
                const filtered = res.records.filter(rcd => judgeActor(id, rcd.value));
                if (filtered.length) {
                    return new Promise(rslv => rslv(filtered));
                } else if (res.cursor) {
                    return readStoredActors(id, res);
                } else {
                    return new Promise(rslv => rslv([]));
                }
            });
    return return_promise;
}

function judgeActor(id, act) {
    if (id.did) {
        return act.did === id.did;
    } else if (id.name) {
        return act.name === id.name;
    } else if (id.accounts) {
        return Object.keys(id.accounts).some(sv => {
            if (!act.accounts || !act.accounts[sv]) return false;
            return id.accounts[sv].identifier === act.accounts[sv].identifier;
        });
    }
    return;
}

function fetchStoredActors(cursor = "no") {
    const cursor_query = (cursor === "no" ? "" : `&cursor=${cursor}`);
    const res_promise = 
        fetch(`https://bsky.social/xrpc/com.atproto.repo.listRecords?repo=${encodeURIComponent(vwousu_did)}&collection=${encodeURIComponent("com.vwousu.report.actorStore")}` + cursor_query, {
            method: "GET"
        })
            .then(res => {
                return res.json();
            })
    return res_promise;
}
