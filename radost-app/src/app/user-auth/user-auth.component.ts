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
//чрез този компонент и извличането на данните на оторизирания юзър не позволяваме на рефреш да се разлогне
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
