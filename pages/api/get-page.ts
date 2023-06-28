import faunadb from "faunadb";
import uid from "uid-promise";

import { client } from "../../lib/db";

const { Get, Match, Index } = faunadb.query;

export default async (req, res) => {
  let {
    query: { page },
    cookies: { token, linkToken }
  } = req;

  // console.log('🦷 1 client: ', client) //
  // console.log('🦷 2 get-page.ts | query: ', req.query, req.cookies)

  if (!page) {
    res.status(400).json({ message: "Bad Request: provide a page to query" });
    return;
  }

  if (page === "www") {
    res.status(200).json({ html: null });
    return;
  }

  let sessionId;

  if (linkToken) {
    sessionId = linkToken;
    res.setHeader("Set-Cookie", `token=${linkToken}`);
  } else if (token && !linkToken) {
    sessionId = token;
    res.setHeader("Set-Cookie", `token=${token}`);
  } else {
    try {
      sessionId = await uid(10);
      token = sessionId;
      res.setHeader("Set-Cookie", `token=${token}`);
    } catch (e) {
      console.error({ stack: e.stack, message: e.message });
      res.status(500).json({ stack: e.stack, message: e.message });
      return;
    }
  }

  try {
    console.log(`🌈 sessionId: ${sessionId}`)
    let {
      data: { sessionId: savedPageSessionId, html }
    } = (await client.query(Get(Match(Index("ref_by_name"), page)))) as any;

    console.log(`🌈🌈🌈 page: ${page} | sessionId: ${sessionId} | savePageSessionId: ${savedPageSessionId}`)


    if (savedPageSessionId === sessionId) {
      console.log('🦷 3 allow edit')
      res.status(200).json({ html, allowEdit: true, token });
      return;
    } else {
      console.log('🦷 3 Do NOT allow edit')
      res.status(200).json({ html, allowEdit: false, token });
      return;
    }
  } catch (error) {
    console.log('🔺 error: ', error)
    if (error.name === "NotFound") {
      console.log('🦷 🦷 🦷 Not Found - 404 - redirect to configuration page')
      res.status(404).json({ html: null, token });
      return;
    }

    if (error.syscall === "getaddrinfo") {
      res.status(500).json({
        stack: error.stack,
        message:
          "There was a network error, please check connection and try again"
      });
      return;
    } else {
      console.log('❌ error: ', error)
      console.error({ error });
      res.status(500).json({ stack: error.stack, message: error.message });
      return;
    }
  }
};
