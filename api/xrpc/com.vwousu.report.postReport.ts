import { NowRequest, NowResponse } from "@vercel/node";

const identifier_did_regexp = new RegExp(/^did:plc:[a-z0-9]{24}$/);
const vwousu_did = "did:plc:kyso36rtx6wlziqb7t4mctzm";
const sess_body = { identifier: vwousu_did, password: process.env.BSKY_APP_PASSWORD };

const valid_type = [
    "com.vwousu.report.actor",
    "com.vwousu.graph.fave"
];

const vw_connection = [];

const log = [];

export function GET(req, res) {
    res.send({ hogehoge: log });
    return;
}

export default function POST(req: NowRequest, res: NowResponse) {
    const req_auth_bearer = req.headers["authorization"];
    if (!req_auth_bearer && !req.body && !identifier_did_regexp.test(req.body.repo) && !req.body.record) {
        res.send({ error: "Invalid Request" });
        return;
    }
    res.send({ hoge: req.body, fuga: req.body.collection });
    return;
    if (req.body.collection.match(/^com\.vwousu\.report\./)) {
        if (vw_connection.length === 0) {
            fetchBskySession(req, res);
        } else {
            checkSessionBsky(vw_connection[0], req, res);
        }
    }
    return;
}

function fetchBskySession(req, res) {
    const req_body = req.body;
    fetch(`https://${process.env.VWOUSU_PDS_ENDPOINT}/xrpc/com.atproto.server.createSession`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        referrerPolicy: "strict-origin-when-cross-origin",
        body: JSON.stringify(sess_body)
    })
        .then(response => {
            if (res.status === 401) {
                throw new Error("cannot access");
            }
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
            postRepo(req_body, req, res);
        });
    return;
}

function checkSessionBsky(stored_connection, req, res) {
    const req_body = req.body
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
                    .catch(err => {
                        return res.send(err);
                    })
                    .then(res => {
                        return res.send();
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
                        postRepo(req_body, req, res);
                    });
            }
            return response.json();
        })
    return;
}

function postRepo(req_body, req, res) {
    const req_auth_bearer = req.headers["authorization"];
    fetch(`https://plc.directory/${req_body.repo}`)
        .catch(err => res.send(err))
        .then(response => response.json())
        .then(plc => {
            fetch(`${plc.sevice.filter(sv => sv.id === "#atproto_pds")[0].serviceEndpoint}/xrpc/com.atproto.repo.createRecord`, {
                method: "POST",
                referrerPolicy: "strict-origin-when-cross-origin",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": req_auth_bearer
                },
                body: JSON.stringify(req_body)
            })
                .then(response => response.json())
                .then(res_json => {
                    postRepoStore(req_body, res_json, res);
                });
        });
    return;
}

function postRepoStore(req_body, post_info, res) {
    const repo_body = req_body;
    repo_body.collection = req_body.collection + "Store";
    repo_body.repo = vwousu_did;
    repo_body.rkey = post_info.uri.split("/").pop();
    repo_body.record = {
        ...req_body.record,
        $type: repo_body.collection,
        originRepo: req_body.repo,
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
        .catch(err => res.send(err))
        .then(_ => {
            res.send(post_info);
        });
    return;
}