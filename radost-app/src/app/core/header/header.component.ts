import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private userService: UserService, private router: Router) {}

  get isLoggedIn(): boolean { //проверява дали има user
    return this.userService.isLogged; //извикваме от user.service getter isLogged, който ни връща true/false в зависимост от това дали имаме user
  }

  
  get username(): string {
    return this.userService.user?.username || '';
  }
 

  logout() {
    this.userService.logout().subscribe({
next: () => {
  this.router.navigate(['/login']);
}, 
error: () => {
  this.router.navigate(['/login'])
}
    })
  }

}
