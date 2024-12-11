import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactsComponent } from './contacts/contacts.component';
import { HomeComponent } from './core/home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ErrorComponent } from './core/error/error.component';

const routes: Routes = [
  {path: '', pathMatch:'full', redirectTo:'/home'},
  {path: 'home', component: HomeComponent},
  {path: 'auth',
    loadChildren: () => import('./user/user.module').then((module) => module.UserModule) //lazy Module
  },
  {path: 'about', component: AboutComponent},
  {path: 'contacts', component: ContactsComponent}, //TODO implement contacts component
  {path: 'error', component: ErrorComponent},
  {path: '**', redirectTo: '/404'},
  {path: '404', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
