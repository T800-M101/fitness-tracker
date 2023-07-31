import { BehaviorSubject, Observable } from "rxjs";
import { AuthData } from "./auth-data.model";
import { User } from "./user.model";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { TrainingService } from "../training/training.service";

@Injectable()
export class AuthService {
    private authChange = new BehaviorSubject<boolean>(false);
    private isAuthenticated = false;
    
    constructor(private router: Router, private afAuth: AngularFireAuth, private trainingService: TrainingService){}

    initAuthListener() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.isAuthenticated = true;
                this.authChange.next(true);
                this.router.navigate(['/training']);
            } else {
                this.trainingService.cancelSubscriptions();
                this.authChange.next(false);
                this.isAuthenticated = false;
                this.router.navigate(['/login']);
            }
        });
    }

    registerUser(authData: AuthData): void {
        this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password)
        .then(success => {})
        .catch(error => {});
        
    }

    login(authData: AuthData): void {
        this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
        .then(success => {})
        .catch(error => {});
    }

    logout(): void {
        this.afAuth.signOut();
    }

 
    isAuth(): boolean {
        return this.isAuthenticated;
    }

    isUserAuthenticated(): Observable<boolean> {
        return this.authChange.asObservable();
    }

}