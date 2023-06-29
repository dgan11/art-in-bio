import faunadb from "faunadb";
import Pusher from "pusher";

import { client } from "../../lib/db";

const { Get, Match, Index, Update, Create, Collection } = faunadb.query;

const {
  NEXT_PUBLIC_PUSHER_APP_ID: appId,
  NEXT_PUBLIC_PUSHER_APP_KEY: key,
  NEXT_PUBLIC_PUSHER_APP_SECRET: secret
} = process.env;

const pusher = new Pusher({
  appId,
  key,
  secret,
  cluster: "us3"
});

export default async (req, res) => {
  let {
    cookies: { token },
    body: { email, html, config },
    headers: { host }
  } = req;

  const sessionId = token;

  // parse page information from host

  let isDev = host.includes("localhost");
  let splitHost = host.split(".");

  if ((!isDev && splitHost.length === 3) || (isDev && splitHost.length === 2)) {
    let page = splitHost[0];
    // check to see if page exists in db
    try {
      const {
        data: { sessionId: savedPageSessionId },
        ref
      } = (await client.query(Get(Match(Index("ref_by_name"), page)))) as any;

      if (sessionId === savedPageSessionId) {
        await client.query(
          Update(ref, {
            data: {
              html,
              config,
              email
            }
          })
        );
      }

      try {
        console.log(`hydrating html for ${page}.artin.bio`);
        await new Promise<void>((resolve, reject) => {
          pusher.trigger(page, "hydrate-html", html, err => {
            if (err) return reject(err);
            resolve();
          });
        });
      } catch (e) {
        console.log({ message: e.message });
      }

      res.setHeader("Set-Cookie", `token=${token}`);
      res.status(200).json({ editLink: `${req.headers.host}/?edit=${token}'` });
      return;
    } catch (e) {
      if (e.name === "NotFound") {
        try {
          console.log('🎨 creating a new documnet in pages for name: ', page)
          await client.query(
            Create(Collection("pages"), {
              data: {
                sessionId,
                html,
                config,
                email,
                name: page
              }
            })
          );
          res.setHeader("Set-Cookie", `token=${token}`);
          res
            .status(200)
            .json({ editLink: `${req.headers.host}/?edit=${token}'` });
          return;
        } catch (e) {
          console.error(new Error(e.message));
          res.status(500).json({ stack: e.stack, message: e.message });
          return;
        }
      } else {
        console.error(new Error(e.message));
        res.status(500).json({ stack: e.stack, message: e.message });
        return;
      }
    }
  }
};
