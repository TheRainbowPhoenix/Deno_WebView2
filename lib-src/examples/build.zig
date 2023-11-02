const std = @import("std");

pub fn build(b: *std.build.Builder) void {
    // const exe = b.addExecutable(.{ .name = "basic" });
    const exe = b.addExecutable("basic", null);
    exe.addCSourceFile("basic.c", &[_][]const u8{});
    // exe.addCSourceFile(.{
    //     .file = .{ .path = "basic.c" },
    //     .flags = &.{
    //         // TODO output -std=c89 compatible C code
    //         "-std=c99",
    //         "-pedantic",
    //         "-Werror",
    //     },
    // });
    exe.linkLibC();
    exe.addIncludePath("dll");
    exe.addLibraryPath("dll/x64");
    exe.addObjectFile("dll/x64/webview.lib");
    exe.linkSystemLibraryName("webview");
    exe.install();
}
