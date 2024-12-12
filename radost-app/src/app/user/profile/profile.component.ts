import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { UserProfileDetails } from 'src/app/types/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  showEditProfile: boolean = false;

  userProfileDetails: UserProfileDetails = {
    username: '',
    email: '',
  }

  constructor(private formBuilder: FormBuilder, private userService: UserService) {}

  form = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(12)]],
   // additionalInfo: ['', [Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.pattern('[A-Za-z0-9.-]+@[a-zA-Z0-9.-]+')]], //TODO fix regexp
})

ngOnInit(): void {

  //Peter , peter@abv.bg
  const { username, email} = this.userService.user!;

  this.userProfileDetails = {
    username, //Peter
    email, //peter@abv.bg
  };

  //на едит 
  this.form.setValue({
    username, //Peter
    email, //peter@abv.bg
  });
}

onShowEditProfile(): void {
  this.showEditProfile = !this.showEditProfile;
}

updateProfileHandler(): void {
 if(this.form.invalid) {
    return;
  }

  //данните от type userProfileDetails ще се ъпдейтнат с данните, въведени във формата
  this.userProfileDetails = this.form.value as UserProfileDetails;
  //запазваме новите данни в type userProfileDetails
  const {username, email} = this.userProfileDetails;

  //когато се ъпдейтне формата, ще се зареди картичката
  this.userService.updateUserProfile(username, email).subscribe(()=> {
  this.onShowEditProfile();
  });

}

onCancel(e: Event) {
  e.preventDefault();
  this.onShowEditProfile();
}

}
