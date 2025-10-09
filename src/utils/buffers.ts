export function toBufferSource(input: ArrayBuffer | ArrayBufferView): ArrayBuffer {
  return input instanceof Uint8Array ? (input.buffer as ArrayBuffer) : (input as ArrayBuffer);
}
