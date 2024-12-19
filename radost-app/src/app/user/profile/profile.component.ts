import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';
import { AuthUser, UserProfileDetails } from 'src/app/types/user';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  user = {} as AuthUser;
  showEditProfile: boolean = false;

  userProfileDetails: UserProfileDetails = {
    username: '',
    email: '',
  }

  constructor(private formBuilder: FormBuilder, private userService: UserService) {}

  form = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(12)]],
    email: ['', [Validators.required, Validators.pattern('[A-Za-z0-9.-]+@[a-zA-Z0-9.-]+\.(com|bg|org)')]],
})

ngOnInit(): void {
  const { username, email} = this.userService.user!;

  this.userProfileDetails = {
    username, 
    email, 
  };


  this.form.setValue({
    username, 
    email, 
  });
}

onShowEditProfile(): void {
  this.showEditProfile = !this.showEditProfile;
}

updateProfileHandler(): void {
  if(this.form.invalid) {
    return;
  }

  this.userProfileDetails = this.form.value as UserProfileDetails;
  const {username, email} = this.userProfileDetails;


  this.userService.updateUserProfile(username, email).subscribe(()=> {
  this.onShowEditProfile();
  });

}

onCancel(e: Event) {
  e.preventDefault();
  this.onShowEditProfile();
}

}
