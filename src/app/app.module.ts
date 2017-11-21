import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { LOCALE_ID } from '@angular/core';

// Securizacion
import { AuthGuard } from './auth/auth.guard';
import { AuthenticationService } from './auth/authentication.service';
import { ProductService } from './services/product.service';

// Rutas
import { routing, appRoutingProviders } from './app.routing';

// Utilidades
import { SpanishCurrencyPipe } from './utils/pipe.number.es'

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CvComponent } from './components/cv/cv.component';
import { ProductoAddComponent } from './components/producto-add/producto-add.component';
import { ProductoEditComponent } from './components/producto-edit/producto-edit.component';
import { ProductosListComponent } from './components/productos-list/productos-list.component';
import { ProductoDetailComponent } from './components/producto-detail/producto-detail.component';
import { RegisterComponent } from './components/register/register.component';
import { UserProductListComponent } from './components/user-productos-list/user-productos-list.component';
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    CvComponent,
    LoginComponent,
    ProductosListComponent,
    ProductoDetailComponent,
    ProductoAddComponent,
    ProductoEditComponent,
    RegisterComponent,
    SpanishCurrencyPipe,
    UserProductListComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    appRoutingProviders,
    AuthGuard,
    AuthenticationService,
    ProductService,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: LOCALE_ID, useValue: navigator.language}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
