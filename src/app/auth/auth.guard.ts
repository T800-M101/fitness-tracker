import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { inject } from "@angular/core";

export const isUserLoggedInGuard: CanActivateFn = () => {
    const authService: AuthService = inject(AuthService);
    const router = new Router();
    let userIsAuthenticated = false;

    authService.isUserAuthenticated().subscribe((isAuthenticated: boolean) => {
        userIsAuthenticated = isAuthenticated;
    });
    
    if(userIsAuthenticated) {
        return true;
    } else {
        router.navigate(['login']);
        return false;
    }
    
    
}