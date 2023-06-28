import faunadb from 'faunadb';

export const client = new faunadb.Client({
  secret: process.env.FAUNADB_STATIC_FUN_KEY
});

/**
 * Go to https://dashboard.fauna.com/
 * - create a database
 * - create a collection called "pages"
 * - create an index called "ref_by_name" with terms "data.name"
 * - can insert a test document like this 
 * {
    {
      sessionId: "some-session-id",
      html: "<h1>Hello, world!</h1>",
      page: "ass"
    }
 * {
 * }
 */
