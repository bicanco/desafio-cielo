import { defer, Observable } from 'rxjs';

export const doOnSubscribe = <T>(onSubscribe: () => void) =>
  (source: Observable<T>): Observable<T> => {
    onSubscribe();
    return defer(() => source);
  }
