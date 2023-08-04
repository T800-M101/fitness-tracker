import { inject } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromRoot from "../app.reducer";

export const isUserLoggedInGuard = () => {
    const authService: any = inject(Store<fromRoot.State>);
    return authService.select(fromRoot.getIsAuth);
}