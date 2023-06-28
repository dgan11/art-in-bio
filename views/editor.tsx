import Head from "next/head";
import Div100vh from "react-div-100vh";

import EditorContainer from "../components/editor";
import TopBar from "../components/top-bar";

export function EditorLayout({ html, email, editLink }) {
  console.log('😈 editor.tsx view')
  return (
    <Div100vh>
      <Head>
        <title>art in bio</title>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <TopBar info />
      <EditorContainer html={html} email={email} editLink={editLink} />
    </Div100vh>
  );
}
