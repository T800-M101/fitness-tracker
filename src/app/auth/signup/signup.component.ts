import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  isLoading = false;
  maxDate!: Date;
  
  private loadingSubscription$!: Subscription;

  constructor( private authService: AuthService, private uiService: UIService){}
  
  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.loadingSubscription$ = this.uiService.loadingStateChanged$.subscribe(result => {
      this.isLoading = result;
    });
  }
  
  ngOnDestroy(): void {
    if(this.loadingSubscription$) {
      this.loadingSubscription$.unsubscribe();
    }
  }

  onSubmit(form: NgForm): void {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }

}
