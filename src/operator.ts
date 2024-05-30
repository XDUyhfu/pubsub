import {
  buffer,
  concat,
  from,
  mergeMap,
  Observable,
  skipUntil,
  Subject,
  take,
} from "rxjs";

export const controlCaching = <T = unknown>(control$: Subject<boolean>) => {
  const signal1$ = new Subject();
  const signal2$ = new Subject();
  control$.subscribe({
    next: () => {
      signal1$.next(0);
      signal2$.next(0);
    },
  });

  return (source$: Observable<T>) =>
    // 这样做的限制是上游不能缓存数据，不然订阅第二个 source$ 的时候会重复
    concat(
      source$.pipe(buffer(signal1$), take(1), mergeMap(from)),
      source$.pipe(skipUntil(signal2$)),
    );
};
