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

const routes: Routes = [
  {path : 'employee/employee-details', component : EmployeeDetailsComponent},
  {path : 'contact', component: ContactComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    EmployeesComponent,
    EmployeeDetailsComponent,
    ContactComponent,
    FilterPipe
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
    FormsModule
  ],
  providers: [FilterPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
