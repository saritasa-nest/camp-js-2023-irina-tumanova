import { MonoTypeOperatorFunction, Subject, takeUntil } from 'rxjs';
import { DestroyRef, inject } from '@angular/core';

/** Pipe untilDstroyed for unsubscribe. */
export function untilDestroyed(): <T>() => MonoTypeOperatorFunction<T> {
	const subject$ = new Subject();

	inject(DestroyRef).onDestroy(() => {
		subject$.next(true);
		subject$.complete();
	});

	return <T>() => takeUntil<T>(subject$.asObservable());
}
