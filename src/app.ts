import { encodeCstring } from "./natives.ts";

import webview from "./webview.ts";

let out = {};
console.log("hello");
let buff = encodeCstring("");

let count = webview.GetAvailableCoreWebView2BrowserVersionString(
  encodeCstring(""),
  buff
);

const dataView = new Deno.UnsafePointerView(buff);

console.log("bye");
console.log(dataView);
console.log(count);

// PCWSTR browserExecutableFolder, LPWSTR* versionInfo

// nullptr, nullptr, options.Get(), this

// int GetAvailableCoreWebView2BrowserVersionString(
//             browserExecutableFolder string,
// 	versionInfo *string)
