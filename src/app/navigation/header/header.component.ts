import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output()
  sidenavToggle = new EventEmitter<void>();
   
  isUserAuthenticated$!: Observable<boolean>;
  constructor(private authService: AuthService, private store: Store<fromRoot.State>){}

  ngOnInit(): void {
    this.isUserAuthenticated$ = this.store.select(fromRoot.getIsAuth);
  }

  onToggleSidenav(): void {
    this.sidenavToggle.emit();
  }

  onLogout(): void {
    this.authService.logout();
  }
}
