import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';

export interface OnExit {
  onExit: () => Observable<boolean> | Promise<boolean> | boolean;
}

export const exitGuard: CanDeactivateFn<OnExit> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  console.log('🚀 ~ file: exit.guard.ts:14 ~ component:', component);
  return component.onExit ? component.onExit() : true;
};
