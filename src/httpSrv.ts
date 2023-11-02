import { Webview, SizeHint } from "./webview/webview.ts";
const html = `
  <html>
  <body>
  <button onclick="external.invoke('A')">A</button>
    <button onclick="external.invoke('B')">B</button>
    <button onclick="external.invoke('C')">C</button>
  <button onclick="external.invoke('test')">test</button>
    <script>
      function test() { external.invoke("finish"); }
    </script>
  </body>
  </html>
`;

const webview = new Webview(true, {
  width: 600,
  height: 600,
  hint: SizeHint.NONE,
});
const webview1 = new Webview();
webview1.navigate("https://deno.land/");

const webview2 = new Webview();
webview2.navigate("https://google.com/");

webview1.run();
webview2.run();
