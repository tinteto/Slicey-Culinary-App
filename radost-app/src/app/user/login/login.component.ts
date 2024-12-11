import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern('[A-Za-z0-9.-]+@[a-zA-Z0-9.-]+')]], //TODO fix regexp
    password: ['', [Validators.required]], //Validators.pattern('[A-Z]+[a-z]+[0-9]+')
  })

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {}


  login(): void {
    if(this.form.invalid) {
      return;
    }

    const { email, password } = this.form.value;

    this.userService.login(email!, password!).subscribe(() => {
      this.router.navigate(['/recipes']);
    });
  }
}
