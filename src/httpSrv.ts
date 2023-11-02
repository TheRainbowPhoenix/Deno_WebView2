import { Webview, SizeHint } from "./webview/webview.ts";
// const html = `
//   <html>
//   <body>
//   <button onclick="external.invoke('A')">A</button>
//     <button onclick="external.invoke('B')">B</button>
//     <button onclick="external.invoke('C')">C</button>
//   <button onclick="external.invoke('test')">test</button>
//     <script>
//       function test() { external.invoke("finish"); }
//     </script>
//   </body>
//   </html>
// `;

const webview = new Webview(true, {
  width: 600,
  height: 600,
  hint: SizeHint.NONE,
});

// const html = `<html><body>
//   <button id="increment">Tap me</button>
//     <div>You tapped <span id="count">0</span> time(s).</div>
//     <script>
//       const [incrementElement, countElement] =
//         document.querySelectorAll("#increment, #count");
//       document.addEventListener("DOMContentLoaded", () => {
//         incrementElement.addEventListener("click", () => {
//           window.increment().then(result => {
//             countElement.textContent = result.count;
//           });
//         });
//       });
//     </script>
//   </body></html>`;

const html = `
   <html>
   <body>
     <h1>Hello from deno v${Deno.version.deno}</h1>
     <button onclick="press('I was pressed!', 123, new Date()).then(log);">
       Press me!
     </button>
   </body>
   </html>
 `;

webview.navigate(`data:text/html,${encodeURIComponent(html)}`);

const w = webview.unsafeHandle;
webview.title = "Bind Example";
webview.size = { width: 480, height: 320, hint: SizeHint.NONE };

let counter = 0;
// Create and bind `press` to the webview javascript instance.
// This functions in addition to logging its parameters also returns
// a value from deno land to webview land.
webview.bind("press", (a, b, c) => {
  console.log(a, b, c);

  return { times: counter++ };
});

// Bind the `log` function in the webview to the parent instances `console.log`
webview.bind("log", (...args) => console.log(...args));

webview.run();

/*
void increment(const char *seq, const char *req, void *arg) {
  context_t *context = (context_t *)arg;
  char count_string[10] = {0};
  sprintf(count_string, "%u", ++context->count);
  char result[21] = {0};
  strcat(result, "{\"count\": ");
  strcat(result, count_string);
  strcat(result, "}");

  printf("Count: %u\n", context->count);

  webview_return(context->w, seq, 0, result);
}


int main() {
  webview_t w = webview_create(0, NULL);
  context_t context = {.w = w, .count = 0};
  webview_set_title(w, "Bind Example");
  webview_set_size(w, 480, 320, WEBVIEW_HINT_NONE);
  webview_bind(w, "increment", increment, &context);
  webview_set_html(w, html);
  webview_run(w);
  webview_destroy(w);
  return 0;
}
*/
