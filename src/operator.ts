import { buffer, concat, from, mergeMap, Observable, take } from "rxjs";

export const controlCaching =
  <T = unknown>(control$: Observable<T>) =>
  (source$: Observable<T>) =>
    // 这样做的限制是上游不能缓存数据，不然订阅第二个 source$ 的时候会重复
    concat(source$.pipe(buffer(control$), take(1), mergeMap(from)), source$);
