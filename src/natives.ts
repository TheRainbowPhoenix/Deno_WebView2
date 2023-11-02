const encoder = new TextEncoder();
export function encodeCstring(cstring: string): Deno.UnsafePointer {
  const buffer = new Uint8Array(cstring.length + 1);
  encoder.encodeInto(cstring, buffer);
  return Deno.UnsafePointer.of(buffer);
}
