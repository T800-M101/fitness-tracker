import { BehaviorSubject, Observable } from "rxjs";
import { AuthData } from "./auth-data.model";
import { User } from "./user.model";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {
    private authChange = new BehaviorSubject<boolean>(false);
    private user!: User | null;
    
    constructor(private router: Router){}

    registerUser(authData: AuthData): void {
        this.user = {
            email: authData.email!,
            userId: Math.round(Math.random() * 10000).toString()
        };
        this.authSuccessfully();
        
    }

    login(authData: AuthData): void {
        this.user = {
            email: authData.email!,
            userId: Math.round(Math.random() * 10000).toString()
        };
        this.authSuccessfully();
    }

    logout(): void {
        this.user = null;
        this.authChange.next(false);
        this.router.navigate(['/login']);
    }

    getUser(): User | null {
        if(this.user) {
            return { ...this.user };
        }

        return null;
    }

    isAuth(): boolean {
        return this.user !== null;
    }

    isUserAuthenticated(): Observable<boolean> {
        return this.authChange.asObservable();
    }

    private authSuccessfully(): void {
        this.authChange.next(true);
        this.router.navigate(['/training']);
    }
}