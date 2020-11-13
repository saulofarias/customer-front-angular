import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavComponent } from './nav/nav.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { InputComponent } from './fields/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputSelectComponent } from './fields/input-select/input-select.component';
import { ToastsComponent } from './toasts/toasts.component';
import { CustomerComponent } from 'src/app/view/customer/customer.component';
import { CustomerListComponent } from 'src/app/view/customer/customer-list/customer-list.component';
import { CustomerInfoComponent } from 'src/app/view/customer/customer-info/customer-info.component';
import { LoginComponent } from 'src/app/view/login/login.component';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { RegisterComponent } from 'src/app/core/components/register/register.component';

@NgModule({
  declarations: [
    NavComponent,
    CustomerComponent,
    InputComponent,
    CustomerInfoComponent,
    InputSelectComponent,
    CustomerListComponent,
    ToastsComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'clientes',
        component: CustomerListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'clientes/info',
        component: CustomerInfoComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'clientes/cad',
        component: CustomerInfoComponent,
        canActivate: [AuthGuard],
      },
    ]),
  ],
  exports: [NavComponent, CustomerComponent],
})
export class ComponentsModule {}
