import { NowRequest, NowResponse } from "@vercel/node";

const identifier_did_regexp = new RegExp(/^did:plc:[a-z0-9]{24}$/);
const vwousu_did = "did:plc:kyso36rtx6wlziqb7t4mctzm";
const sess_body = { identifier: vwousu_did, password: process.env.BSKY_APP_PASSWORD };

const valid_type = [
    "com.vwousu.report.actor"
];

const vw_connection = [];

export default function POST(req: NowRequest, res: NowResponse) {
    console.log("Function Start");
    const req_body = JSON.parse(req.body);
    console.log({ body: req_body });
    if (!req.body.target && !identifier_did_regexp.test(req_body.target.repo) && !req_body.target.record) {
        console.log("Request is invalid.");
        res.json({ error: "Invalid Request" });
        return;
    }
    if (~valid_type.indexOf(req_body.target.collection)) {
        if (vw_connection.length === 0) {
            console.log("start process [report-createSess]");
            fetchBskySession(req, res);
        } else {
            console.log("start process [report-refreshSess]");
            checkSessionBsky(vw_connection[0], req, res);
        }
    } else {
        console.log("the type is invalid");
        res.json({ error: "Invalid Type" });
    }
    return;
}

function fetchBskySession(req, res) {
    fetch(`https://${process.env.VWOUSU_PDS_ENDPOINT}/xrpc/com.atproto.server.createSession`, {
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
            vw_connection.push({
                sess: {
                    did: sess.did,
                    serviceEndpoint: sess.didDoc.service[0].serviceEndpoint,
                    accessJwt: sess.accessJwt,
                    refreshJwt: sess.refreshJwt
                }
            });
            postRepoStore(req, res);
        })
        .catch(err => {
            console.log(err);
            res.send(err);
        });
    return;
}

function checkSessionBsky(stored_connection, req, res) {
    fetch(`${stored_connection.sess.serviceEndpoint}/xrpc/com.atproto.server.getSession`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${stored_connection.sess.accessJwt}`
        }
    })
        .then(response => {
            if (!response.ok) {
                fetch(`${stored_connection.sess.serviceEndpoint}/xrpc/com.atproto.server.refreshSession`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${stored_connection.sess.refreshJwt}`
                    }
                })
                    .then(response => {
                        return response.json();
                    })
                    .then(sess => {
                        vw_connection.push({
                            sess: {
                                did: sess.did,
                                serviceEndpoint: sess.didDoc.service[0].serviceEndpoint,
                                accessJwt: sess.accessJwt,
                                refreshJwt: sess.refreshJwt
                            }
                        });
                        postRepoStore(req, res);
                    });
            }
            return response.json();
        })
    return;
}

function postRepoStore(req, res) {
    console.log("start process store report");
    const req_body = JSON.parse(req.body);
    const post_info = req_body.post;
    const repo_body = req_body.target;
    repo_body.collection = req_body.target.collection + "Store";
    repo_body.repo = vwousu_did;
    repo_body.rkey = post_info.uri.split("/").pop();
    repo_body.record = {
        ...req_body.target.record,
        $type: repo_body.collection,
        originRepo: req_body.target.repo,
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
                res.json(post_info);
            }
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        });
    return;
}