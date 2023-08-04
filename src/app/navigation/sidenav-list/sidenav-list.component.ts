import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {

  @Output() 
  closeSidenav = new EventEmitter();

  isUserAuthenticated$!: Observable<boolean>;

  constructor(private authService: AuthService, private store: Store<fromRoot.State>){}

  ngOnInit(): void {
    this.isUserAuthenticated$ = this.store.select(fromRoot.getIsAuth);
  }

  onClose(): void {
    this.closeSidenav.emit();
  }

  onLogout(): void {
      this.authService.logout();
      this.onClose();
  }
}
