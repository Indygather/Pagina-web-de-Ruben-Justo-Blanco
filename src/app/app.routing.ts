import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';

import { CvComponent } from './components/cv/cv.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { ProductoDetailComponent } from './components/producto-detail/producto-detail.component';
import { ProductoAddComponent } from './components/producto-add/producto-add.component';
import { ProductoEditComponent } from './components/producto-edit/producto-edit.component';
import { UserProductListComponent } from './components/user-productos-list/user-productos-list.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';

export const paths = [
    {path: 'register', component: RegisterComponent},
    {path: '', component: CvComponent},
    {path: 'cv', component: CvComponent},
    {path: 'add-product', component: ProductoAddComponent, canActivate: [AuthGuard]},
    {path: 'edit-product/:id', component: ProductoEditComponent, canActivate: [AuthGuard]},
    {path: 'products', component: BuscadorComponent},
    {path: 'products/:userId', component: UserProductListComponent, canActivate: [AuthGuard]},
    {path: 'product-detail/:id', component: ProductoDetailComponent},
    {path: 'error', component: ErrorPageComponent},
    {path: '**', component: ErrorPageComponent}
    ];
    
const appRoutes: Routes = paths;

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);