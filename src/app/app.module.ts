import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeDetailsComponent } from './employees/employee-details/employee-details.component';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './footer/contact/contact.component';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './search-filter.pipe';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomePageComponent } from './home-page/home-page.component';
import { WhoWeAreComponent } from './who-we-are/who-we-are.component';
import { NewsComponent } from './news/news.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MatDialogModule } from '@angular/material/dialog';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'header', component: HeaderComponent},
  {path: 'who-we-are', component: WhoWeAreComponent},
  {path: 'news', component: NewsComponent},
  {path: 'documentation', component: DocumentationComponent},
  {path: 'login-page', component: LoginPageComponent},
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    EmployeesComponent,
    EmployeeDetailsComponent,
    ContactComponent,
    FilterPipe,
    NotFoundComponent,
    HomePageComponent,
    WhoWeAreComponent,
    NewsComponent,
    DocumentationComponent,
    LoginPageComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    MatSidenavModule,
    MatToolbarModule,
    MatRippleModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule
  ],
  providers: [FilterPipe],
  bootstrap: [AppComponent],
  entryComponents: [LoginPageComponent]
})
export class AppModule { }
