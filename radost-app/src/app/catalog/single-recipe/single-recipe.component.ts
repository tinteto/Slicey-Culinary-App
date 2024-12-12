import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Comment } from 'src/app/types/comment';
import { Recipe, RecipeDetails } from 'src/app/types/recipe';
import { UserService } from 'src/app/user/user.service';


@Component({
  selector: 'app-single-recipe',
  templateUrl: './single-recipe.component.html',
  styleUrls: ['./single-recipe.component.css']
})
export class SingleRecipeComponent implements OnInit {
  recipe = {} as Recipe;
  comments: Comment[] = [];

  showEditRecipeForm: boolean = false;

  recipeDetails: RecipeDetails = {
    name: '',
    ingredients: '',
    steps: '',
    img: '',
  };

  form = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    ingredients: ['', [Validators.required, Validators.minLength(10)]],
    steps: ['', [Validators.required, Validators.minLength(10)]],
    img: [''], //TODO
  });

get isLoggedIn(): boolean {
  return this.userService.isLogged;
}

get ownerId(): string {
  return this.userService.user?._id || ''; //взимам си Id-то, за да проверявам дали може да редактира и изтрива рецепти
}



constructor(private formBuilder: FormBuilder, private userService: UserService, private apiService: ApiService, private activatedRoute: ActivatedRoute, private router: Router) {}

  
  ngOnInit(): void {

    this.activatedRoute.params.subscribe((data) => {
    const id = data['id']; 

    this.apiService.getSingleRecipeById(id).subscribe((recipe) => {
    console.log(recipe);
        this.recipe = recipe;
      });


    this.apiService.getAllCommentsForARecipe(id).subscribe((comments) => {
    console.log(comments); //TODO

    });

    });
  
}

isOwner(recipe: Recipe): boolean {
const isUserOwner = recipe._ownerId === this.userService.user?._id;
return isUserOwner;
}

// getAllCommentsForARecipe(id: string) {
//   return this.http.get<Recipe>(`${apiUrl}/data/comments?where=recipeId%3D%22${id}%22`);
// }


onDeleteRecipe(): void {
    this.activatedRoute.params.subscribe((data) => {
      const id = data['id'];

      alert('Are you sure you want to delete this recipe?');

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


onCancelEditRecipe(event: Event) {
  event.preventDefault();
  this.onToggle();

}
}


