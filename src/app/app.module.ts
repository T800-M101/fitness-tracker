import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthModule } from './auth/auth.module';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';




import { TrainingService } from './training/training.service';
import { AuthService } from './auth/auth.service';
import { UIService } from './shared/ui.service';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { TrainingRoutingModule } from './training/training-routing.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './app.reducer';



@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
  ],
  imports: [
    TrainingRoutingModule ,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AuthModule,
    AngularFirestoreModule,
    StoreModule.forRoot(reducers),
 
  ],
  providers: [
    AuthService,
    TrainingService,
    UIService
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
