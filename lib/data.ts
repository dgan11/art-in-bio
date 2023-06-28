async function getPageData(href): Promise<any> {
  console.log('👠 lib/data.ts getPageData() start')
  const { host } = window.location;
  let isDev = host.includes('localhost');
  let splitHost = host.split('.');
  console.log('👠2 splitHost: ', splitHost)


  if ((!isDev && splitHost.length === 3) || (isDev && splitHost.length === 2)) {
    let page = splitHost[0];
    console.log('👠3 page: ', page)

    if (page === 'www') {
      return null;
    }
    console.log(`gpd 2 -- fetch /api/get-page?page=${page}`)
    let res = await fetch(`/api/get-page?page=${page}`);

    console.log(`gpd 3 -- res.status: ${res.status}`)

    if (res.status === 200) {
      let { html, allowEdit, token } = await res.json();
      return { html, allowEdit, editLink: `${href}?edit=${token}` };
    }

    if (res.status === 404) {
      let { html, token } = await res.json();
      return { html, editLink: `${href}?edit=${token}` };
    }

    if (!res.ok && res.status !== 404) {
      let { stack, message } = await res.json();
      return { errorCode: res.status, stack, message };
    }
  }
}

const defaultMarkup = `
<h1>Welcome to<br> static.fun!</h1>
<marquee>hack and be merry <3</marquee>
<img src="https://media.giphy.com/media/C9x8gX02SnMIoAClXa/giphy.gif" />
<style>
  * {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }
  body {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
  h1 {
    color: salmon;
    font-size: 64px
  }
  img {
    height: auto;
    width: auto;
    max-width: 100%;
    margin-top: 24px;
  }
  marquee {
    width: fit-content;
    background: salmon;
    color: black;
    font-family: "Comic Sans", "Comic Sans MS", "Chalkboard", "ChalkboardSE-Regular", monospace;
    padding: 10px;
    text-transform: black;
    border: 3px solid black;
  }
</style>



`;

export { getPageData, defaultMarkup };
