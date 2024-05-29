import { bufferWhen, from, merge, mergeMap, Observable, skipUntil } from "rxjs";

export const controlCaching =
  <T = unknown>(control$: Observable<T>) =>
  (source$: Observable<T>) =>
    merge(
      source$.pipe(
        bufferWhen(() => control$),
        mergeMap(from),
      ),
      source$.pipe(skipUntil(control$)),
    );
