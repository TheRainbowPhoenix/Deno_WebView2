import os

from webview import Webview

# os.environ["WEBVIEW2_PATH"] = "../Microsoft.WebView2.FixedVersionRuntime.118.0.2088.76.x64"

app = Webview(debug=True)
app.navigate("https://www.google.com")
app.run()
