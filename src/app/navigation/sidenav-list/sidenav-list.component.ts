import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {

  @Output() 
  closeSidenav = new EventEmitter();

  isUserAuthenticated!: boolean;

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.authService.isUserAuthenticated().subscribe((isAuthenticated:boolean) => {
      this.isUserAuthenticated = isAuthenticated;
    });
  }

  onClose(): void {
    this.closeSidenav.emit();
  }

  onLogout(): void {
      this.authService.logout();
      this.onClose();
  }
}
