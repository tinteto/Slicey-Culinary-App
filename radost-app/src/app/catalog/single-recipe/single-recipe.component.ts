import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Recipe, RecipeDetails } from 'src/app/types/recipe';


@Component({
  selector: 'app-single-recipe',
  templateUrl: './single-recipe.component.html',
  styleUrls: ['./single-recipe.component.css']
})
export class SingleRecipeComponent implements OnInit {
  recipe = {} as Recipe;
  showEditRecipeForm: boolean = false;

  recipeDetails: RecipeDetails = {
    name: '',
    ingredients: '',
    steps: '',
    img: '',
  };

  form = this.formBuilder.group({
    name: ['', [Validators.required]],
    ingredients: ['', [Validators.required]],
    steps: ['', [Validators.required]],
    img: [''],
  });



  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private activatedRoute: ActivatedRoute, private router: Router) {}

  
  ngOnInit(): void {

    this.activatedRoute.params.subscribe((data) => {
    const id = data['id']; 

    this.apiService.getSingleRecipeById(id).subscribe((recipe) => {
       console.log(recipe);
        this.recipe = recipe;
      });

    });

   
}


onDeleteRecipe(): void {
    this.activatedRoute.params.subscribe((data) => {
      const id = data['id'];

      this.apiService.deleteRecipe(id).subscribe(() => {
        this.router.navigate(['/recipes']);
      })
    })

}



onToggle(): void {
  this.showEditRecipeForm = !this.showEditRecipeForm;
}

updateRecipeHandler(): void {
 if(this.form.invalid) {
    return;
  }

  this.activatedRoute.params.subscribe((data) => {
  const id = data['id'];

  this.recipeDetails = this.form.value as RecipeDetails;
  const {name, ingredients, steps, img} = this.recipeDetails;

  this.apiService.updateRecipe(id, name, ingredients, steps, img).subscribe(() => {
    this.onToggle();
  })
})

 

}

// updateRecipe(id: string, name: string, ingredients: string, steps: string, img: string  ) { //!!img
//   const payload = { name, ingredients, steps, img };
//   return this.http.put<Recipe>(`${apiUrl}/data/recipes/${id}` , payload);
// }

onCancelEditRecipe(event: Event) {
  event.preventDefault();
  this.onToggle();

}
}


