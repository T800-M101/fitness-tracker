import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  @Output()
  sidenavToggle = new EventEmitter<void>();
   
  isUserAuthenticated!: boolean;
  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.authService.isUserAuthenticated().subscribe((isAuthenticated: boolean) => {
      this.isUserAuthenticated = isAuthenticated;
    });
  }

  onToggleSidenav(): void {
    this.sidenavToggle.emit();
  }

  onLogout(): void {
    this.authService.logout();
  }
}
