export const lib = Deno.dlopen("webview.dll", {
  webview_create: {
    parameters: ["i32", "pointer"],
    result: "pointer",
  },
});

console.log(lib.symbols);
