import { BehaviorSubject, Observable } from "rxjs";
import { AuthData } from "./auth-data.model";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { TrainingService } from "../training/training.service";
import { UIService } from "../shared/ui.service";

@Injectable()
export class AuthService {
    private authChange = new BehaviorSubject<boolean>(false);
    private isAuthenticated = false;
    
    constructor(
        private router: Router, 
        private afAuth: AngularFireAuth, 
        private trainingService: TrainingService,
        private uiService: UIService ){}

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
        this.uiService.loadingStateChanged$.next(true);
        this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password)
        .then(success => {
        this.uiService.loadingStateChanged$.next(false);
        })
        .catch(error => {
            this.uiService.loadingStateChanged$.next(false);
            this.uiService.showSnackBar(error.message, undefined, 3000);
        });
    }


    login(authData: AuthData): void {
        this.uiService.loadingStateChanged$.next(true);
        this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
        .then(success => {
        this.uiService.loadingStateChanged$.next(false);
        })
        .catch(error => {
            this.uiService.loadingStateChanged$.next(false);
            this.uiService.showSnackBar(error.message, undefined, 3000);
        });
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