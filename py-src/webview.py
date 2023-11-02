from ctypes import c_char_p, c_int, c_void_p, WINFUNCTYPE, windll
from ffi import lib, instances, encode_cstring, unload_hook

# Define the Webview class


class Webview:
    def __init__(self, debug=False, size=None, window=None):
        # Create a webview instance
        self.handle = lib.webview_create(int(debug), window)
        if size:
            self.set_size(size)

    def set_size(self, size):
        lib.webview_set_size(
            self.handle, size['width'], size['height'], size['hint'])

    def set_title(self, title):
        lib.webview_set_title(self.handle, encode_cstring(title))

    def navigate(self, url):
        lib.webview_navigate(self.handle, encode_cstring(url))

    def run(self):
        lib.webview_run(self.handle)

    def bind(self, name, callback, arg=None):
        def callback_wrapper(seq, req):
            result = callback(seq.decode('utf-8'), req.decode('utf-8'), arg)
            if isinstance(result, str):
                lib.webview_return(self.handle, seq, 0, result.encode('utf-8'))
            else:
                lib.webview_return(self.handle, seq, 1, result.encode('utf-8'))

        # Create a callback function and store it in a map
        self.callback_map[name] = webview_callback(callback_wrapper)
        lib.webview_bind(self.handle, name.encode(
            'utf-8'), self.callback_map[name], arg)

    def unbind(self, name):
        # Unbind a previously bound function
        lib.webview_unbind(self.handle, name.encode('utf-8'))
        # Remove the callback from the map
        del self.callback_map[name]

    def return_result(self, seq, status, result):
        lib.webview_return(self.handle, seq.encode(
            'utf-8'), status, result.encode('utf-8'))

    def eval(self, source):
        lib.webview_eval(
            self.handle, encode_cstring(source))

    def init(self, source):
        lib.webview_init(
            self.handle, encode_cstring(source))


if __name__ == '__main__':
    # Your webview application logic here
    app = Webview(debug=True)
    app.navigate("https://www.google.com")
    app.run()
