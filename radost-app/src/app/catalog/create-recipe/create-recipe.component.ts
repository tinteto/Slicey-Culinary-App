import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})
export class CreateRecipeComponent {

  constructor(private apiService: ApiService, private router: Router) {}

  submitRecipe(form: NgForm) {
    if(form.invalid) {
      return;
    }
    
  const {name, ingredients, steps, img} = form.value; 

  this.apiService.createNewRecipe(name, ingredients, steps, img).subscribe(() => {
  this.router.navigate(['/catalog/recipes']);
})
  }

  onCancel(event: Event): void {
event.preventDefault();
this.router.navigate(['/catalog/recipes']);
  }

}
