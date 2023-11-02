import ctypes
import os
import platform

version = "0.7.3"
# cache = "use" if os.environ.get("PLUGIN_URL") is None else "reloadAll"
# url = os.environ.get(
#     "PLUGIN_URL") or f"https://github.com/webview/webview_deno/releases/download/{version}/"

# Encodes a string to a null-terminated string


def encode_cstring(value):
    return value.encode("utf-8") + b"\0"

# Checks for the existence of './WebView2Loader.dll' on Windows


def check_for_webview2_loader():
    try:
        os.stat("./WebView2Loader.dll")
        return True
    except FileNotFoundError:
        return False


# Load the library
if platform.system() == "Windows":
    preload = True

    def unload():
        for instance in instances:
            instance.destroy()
        lib.close()

    if preload:
        unload_hook = unload

    current_dir = os.getcwd()  # os.path.dirname(os.path.abspath(__file__))
    dll_filename = "webview.dll"

    lib = ctypes.WinDLL(os.path.join(current_dir, dll_filename))

    lib.webview_create.argtypes = [ctypes.c_int, ctypes.c_void_p]
    lib.webview_create.restype = ctypes.c_void_p

    lib.webview_destroy.argtypes = [ctypes.c_void_p]
    lib.webview_destroy.restype = None

    lib.webview_run.argtypes = [ctypes.c_void_p]
    lib.webview_run.restype = None

    lib.webview_terminate.argtypes = [ctypes.c_void_p]
    lib.webview_terminate.restype = None

    lib.webview_get_window.argtypes = [ctypes.c_void_p]
    lib.webview_get_window.restype = ctypes.c_void_p

    lib.webview_set_title.argtypes = [ctypes.c_void_p, ctypes.c_char_p]
    lib.webview_set_title.restype = None

    lib.webview_set_size.argtypes = [
        ctypes.c_void_p, ctypes.c_int, ctypes.c_int, ctypes.c_int]
    lib.webview_set_size.restype = None

    lib.webview_navigate.argtypes = [ctypes.c_void_p, ctypes.c_char_p]
    lib.webview_navigate.restype = None

    lib.webview_set_html.argtypes = [ctypes.c_void_p, ctypes.c_void_p]
    lib.webview_set_html.restype = None

    lib.webview_init.argtypes = [ctypes.c_void_p, ctypes.c_char_p]
    lib.webview_init.restype = None

    lib.webview_eval.argtypes = [ctypes.c_void_p, ctypes.c_char_p]
    lib.webview_eval.restype = None

    lib.webview_bind.argtypes = [ctypes.c_void_p, ctypes.c_char_p, ctypes.CFUNCTYPE(
        None, ctypes.c_void_p, ctypes.c_char_p)]
    lib.webview_bind.restype = None

    lib.webview_unbind.argtypes = [ctypes.c_void_p, ctypes.c_char_p]
    lib.webview_unbind.restype = None

    lib.webview_return.argtypes = [ctypes.c_void_p,
                                   ctypes.c_char_p, ctypes.c_int, ctypes.c_char_p]
    lib.webview_return.restype = None

instances = []

if platform.system() == "Windows":
    if "window" in globals():
        preload()

    if not check_for_webview2_loader():
        raise Exception(
            "WebView2Loader.dll does not exist! Make sure to run preload() from the main thread.")
