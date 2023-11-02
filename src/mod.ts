// import { Webview } from "https://deno.land/x/webview/mod.ts";
import { Webview } from "./webview/webview.ts";

// import { Application } from "./app.ts";

// const app = new Application();

console.log(`Deno.cwd() `, Deno.cwd());

// Deno.run({cmd: ["./wv.exe"]});

const html = `
  <html>
  <body>
    <h1>Hello from deno v${Deno.version.deno}</h1>
  </body>
  </html>
`;

const webview = new Webview();

webview.navigate(`data:text/html,${encodeURIComponent(html)}`);
webview.run();
