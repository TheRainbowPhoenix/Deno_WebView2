const webViewLoader = Deno.dlopen("./lib/WebView2Loader.dll", {
  // "CreateCoreWebView2EnvironmentWithOptions": ""
  GetAvailableCoreWebView2BrowserVersionString: {
    parameters: ["pointer", "pointer"],
    result: "i32",
  },
});

export const webview = await Deno.dlopen("./lib/webview.dll", {
  webview_create: {
    parameters: ["i32", "pointer"],
    result: "pointer",
  },
  webview_destroy: {
    parameters: ["pointer"],
    result: "void",
  },
  webview_run: {
    parameters: ["pointer"],
    result: "void",
  },
  webview_terminate: {
    parameters: ["pointer"],
    result: "void",
  },
  // "webview_dispatch": {
  //   parameters: ["pointer", { function: { parameters: ["pointer", "pointer"], result: "void" } }, "pointer"],
  //   result: "void",
  // },
  webview_get_window: {
    parameters: ["pointer"],
    result: "pointer",
  },
  webview_set_title: {
    parameters: ["pointer", "buffer"],
    result: "void",
  },
  webview_set_size: {
    parameters: ["pointer", "i32", "i32", "i32"],
    result: "void",
  },
  webview_navigate: {
    parameters: ["pointer", "buffer"],
    result: "void",
  },
  webview_set_html: {
    parameters: ["pointer", "pointer"],
    result: "void",
  },
  webview_init: {
    parameters: ["pointer", "buffer"],
    result: "void",
  },
  webview_eval: {
    parameters: ["pointer", "buffer"],
    result: "void",
  },
  webview_bind: {
    parameters: ["pointer", "buffer", "function", "pointer"],
    result: "void",
  },
  webview_unbind: {
    parameters: ["pointer", "buffer"],
    result: "void",
  },
  webview_return: {
    parameters: ["pointer", "buffer", "i32", "buffer"],
    result: "void",
  },
} as const);

export default webview.symbols;
