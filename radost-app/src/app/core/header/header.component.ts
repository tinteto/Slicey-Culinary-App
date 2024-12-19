import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from 'src/app/api.service';
import { UserService } from 'src/app/user/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  search = '';
  constructor(private userService: UserService, private apiService: ApiService, private activatedRoute: ActivatedRoute, private router: Router) {}

  get isLoggedIn(): boolean { 
    return this.userService.isLogged; 
  }

 
  get username(): string {
    return this.userService.user?.username || '';
  }


// onSearch(form: NgForm): void { 

//   if(form.invalid) {
//     return;
//   }
//   const query = this.search;  //in HTML - [(ngModel)]="search"   //form.control.value;
//   console.log(query); //{}
  
//   this.apiService.searchRecipe(query).subscribe(() => {
//     this.router.navigate(['/recipes'], {queryParams: {search: query}});
//   http://localhost:3030/data/recipes?where=name%20LIKE%20%22lasagna%22
//   });
// }

 

  logout() {
    this.userService.logout().subscribe({
  next: () => {
  this.router.navigate(['/auth/login']);
  }, 
  error: () => {
  this.router.navigate(['/auth/login']);
  }
  })
  }

}
