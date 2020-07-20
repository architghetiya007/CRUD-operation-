import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { EmployeeComponent } from './employee/employee.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent
  ],

  imports: [
    AppRoutingModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    
  ],

  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }
