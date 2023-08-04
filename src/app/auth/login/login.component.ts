import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from 'src/app/shared/ui.service';
import { Observable} from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading!:Observable<boolean>;
  
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.minLength(6)]),
  });

  constructor(private authService: AuthService, private uiService: UIService, private store: Store<fromRoot.State>){}
  
  ngOnInit(): void {
   this.isLoading = this.store.select(fromRoot.getIsLoading);
  }
  
  onSubmit(): void {
    this.authService.login({
      email: this.form.value.email!,
      password: this.form.value.password!   
    });
  }

}
