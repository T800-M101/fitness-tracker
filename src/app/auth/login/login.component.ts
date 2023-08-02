import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from 'src/app/shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  isLoading = false;
  private loadingSubscription$!: Subscription;

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.minLength(6)]),
  });

  constructor(private authService: AuthService, private uiService: UIService){}
  
  ngOnInit(): void {
    this.loadingSubscription$ = this.uiService.loadingStateChanged$.subscribe(result => {
      this.isLoading = result;
    });
  }
  
  ngOnDestroy(): void {
    if(this.loadingSubscription$) {
      this.loadingSubscription$.unsubscribe();
    }
  }


  onSubmit(): void {
    this.authService.login({
      email: this.form.value.email!,
      password: this.form.value.password!   
    });
  }

}
