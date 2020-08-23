import { Component } from '@angular/core';
import { HomeComponent } from  './components/navegacao/home/home.component';
import { ClienteComponent} from './components/cliente/cliente.component';
import { Routes } from '@angular/router';



export const rootRouterConfig: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'cliente', component: ClienteComponent }
   // { path: 'funcionario', component: EmployeeComponent },
   // { path: 'empresa', component: CompanyComponent },
];
