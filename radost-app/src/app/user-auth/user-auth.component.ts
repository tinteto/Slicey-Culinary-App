import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  isUserAuthenticating = true;

  constructor(private userService: UserService) {}
//не се разлогва на рефреш
  ngOnInit(): void {
    this.userService.getUserProfile().subscribe({
   next: () => {
    this.isUserAuthenticating = false;
   },
   error: () => {
    this.isUserAuthenticating = false;
   },
   complete: () => {
   this.isUserAuthenticating = false;
   }
  });
}
}
