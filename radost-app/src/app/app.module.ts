import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { ContactsComponent } from './contacts/contacts.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';
import { CatalogModule } from './catalog/catalog.module';
import { HttpClientModule } from '@angular/common/http'; //! IMPORTANT
import { appInterceptorProvider } from './app.interceptor';
import { UserAuthComponent } from './user-auth/user-auth.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ContactsComponent,
    PageNotFoundComponent,
    UserAuthComponent,
   
  ],
  imports: [
    BrowserModule,
    CoreModule, //header, footer, home, error
    SharedModule,
    // UserModule,
    CatalogModule,//експортваме каталог модула, който си е експортнал каталог раутинг модула
    HttpClientModule,
    AppRoutingModule, // винаги да стои накрая
  ],
  providers: [appInterceptorProvider], //от app.interceptor.ts
  bootstrap: [AppComponent]
})
export class AppModule { }
