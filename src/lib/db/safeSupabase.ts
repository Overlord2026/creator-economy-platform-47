/* lightweight fetch helpers + withFallback that supports array or factory */
export type Ok<T>    = { ok: true;  data: T };
export type Err<E=any> = { ok: false; error: E };
export type Res<T>   = Ok<T> | Err;

export function isOk<T>(r: Res<T>): r is Ok<T> { return (r as any).ok === true; }

export async function withFallback<T>(
  valueOrFactory: T | (() => T | Promise<T>),
  fallback: T
): Promise<T> {
  try {
    const v = typeof valueOrFactory === 'function'
      ? await (valueOrFactory as any)()
      : valueOrFactory;
    return (v ?? fallback) as T;
  } catch {
    return fallback;
  }
}
