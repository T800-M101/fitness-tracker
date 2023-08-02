import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { inject } from "@angular/core";

export const isUserLoggedInGuard = () => {
    const authService: AuthService = inject(AuthService);
    const router = inject(Router);

    return authService.isUserAuthenticated().subscribe(isAuthenticated => {
        if(!isAuthenticated) {
            router.navigate(['login']);
            return false;
        }
        return true;
    });
}