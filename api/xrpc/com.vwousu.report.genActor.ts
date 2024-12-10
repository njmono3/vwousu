import { NowRequest, NowResponse } from "@vercel/node";

const vwousu_did = process.env.ATPROTO_DID;
const sess_body = { identifier: vwousu_did, password: process.env.BSKY_APP_PASSWORD };

const valid_type = [
    "com.vwousu.report.actor"
];

const vw_connection = [];


export default function GET(req: NowRequest, response: NowResponse) { 
    console.log("start function");
    const { name, did, accounts } = req.query;
    const id = { name, did, accounts };
    if (!name && !did && !accounts) { 
        console.log("cannot read identifier");
        response.send({ error: "InvalidRequest", message: "could not find actor" });
        return;
    }
    console.log(id);
    fetchBskySession(id, req, response);
    return;
}

function fetchBskySession(id, req, response) {
    fetch(`${("https://" + process.env.VWOUSU_PDS_ENDPOINT).replace("https://https://", "https://")}/xrpc/com.atproto.server.createSession`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        referrerPolicy: "strict-origin-when-cross-origin",
        body: JSON.stringify(sess_body)
    })
        .then(response => {
            if (response.status === 401 || !response.ok) {
                throw new Error("cannot access");
            }
            return response.json();
        })
        .then(sess => {
            console.log({ connection: sess });
            for (; vw_connection.length;)
                vw_connection.pop();
            vw_connection.push({
                sess: {
                    did: sess.did,
                    serviceEndpoint: sess.didDoc.service[0].serviceEndpoint,
                    accessJwt: sess.accessJwt,
                    refreshJwt: sess.refreshJwt
                }
            });
            readStoredActors(id)
                .then(res => {
                    console.log("finished reading");
                });
        })
        .catch(err => {
            console.log(err);
            response.send(err);
        });
    return;
}

function readStoredActors(id, prev_res = { cursor: "no", records: [] }) {
    const return_promise =
        fetchStoredActors(prev_res.cursor)
            .then(res => {
                console.log(res);
                res.records.map(rcd => {
                    postRepoStore(rcd);
                });
                if (res.cursor) {
                    return readStoredActors(id, res);
                } else {
                    return new Promise(rslv => rslv([]));
                }
            });
    return return_promise;
}

function postRepoStore(rcd) {
    console.log("start process store report");
    const req_body = rcd.value;
    const post_info = rcd;
    const repo_body = req_body;
    repo_body.collection = req_body["$type"] + "Store";
    repo_body.repo = vwousu_did;
    repo_body.record = {
        ...req_body,
        $type: repo_body.collection,
        originUri: post_info.uri,
        originCid: post_info.cid
    };

    fetch(`https://${process.env.VWOUSU_PDS_ENDPOINT}/xrpc/com.atproto.repo.createRecord`, {
        method: "POST",
        referrerPolicy: "strict-origin-when-cross-origin",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${vw_connection[0].sess.accessJwt}`
        },
        body: JSON.stringify(repo_body)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("store rejected");
            } else {
                console.log("success store");
            }
        })
        .catch(err => {
            console.log(err);
        });
    return;
}

function fetchStoredActors(cursor = "no") {
    console.log("fetch store");
    const cursor_query = (cursor === "no" ? "" : `&cursor=${cursor}`);
    const res_promise = 
        fetch(`https://bsky.social/xrpc/com.atproto.repo.listRecords?repo=${encodeURIComponent("did:plc:tpkejgkmpl7xz322emd5lwy2")}&collection=${encodeURIComponent("com.vwousu.report.actor")}` + cursor_query, {
            method: "GET"
        })
            .then(res => {
                return res.json();
            })
    return res_promise;
}
