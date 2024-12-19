import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
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
  @Input() comment!: Comment;
  recipe = {} as Recipe;
  comments: Comment[] | null = [];

  showEditRecipeForm: boolean = false;
  showCommentSection: boolean = false;

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
    img: ['', [Validators.required]],
  });

get isLoggedIn(): boolean {
  return this.userService.isLogged;
}

get ownerId(): string {
  return this.userService.user?._id || '';
}


constructor(private formBuilder: FormBuilder, private userService: UserService, private apiService: ApiService, private activatedRoute: ActivatedRoute, private router: Router) {}

  
  ngOnInit(): void {  
  this.activatedRoute.params.subscribe((data) => {
    const id = data['recipeId'];
 
    this.apiService.getSingleRecipeById(id).subscribe((recipe) => {
    this.recipe = recipe;
         
    const {name, ingredients, steps, img } = this.recipe;
    const ingredientsString = ingredients.toString();
    const stepsString = steps.toString();
       
    this.form.controls.name.setValue(name);
    this.form.controls.img.setValue(img);
    this.form.controls.ingredients.setValue(ingredientsString);
    this.form.controls.steps.setValue(stepsString);
});

  this.apiService.getAllCommentsForARecipe(id).subscribe((comments) => {
  this.comments = comments as any;
});

});
}


addComment(form: NgForm): void {
if(form.invalid) {
  return;
}
const content = form.value.comment;

this.activatedRoute.params.subscribe((data => {
  const id = data['recipeId'];

  this.apiService.postComment(id, content).subscribe(() => {
  this.onToggleComment();
  this.router.navigate([`catalog/recipes-reload/${id}`]);
});
}))
};


isOwner(recipe: Recipe): boolean {
const isUserOwner = recipe._ownerId === this.userService.user?._id;
return isUserOwner;
}


onDeleteRecipe(): void {
    this.activatedRoute.params.subscribe((data) => {
      const id = data['recipeId'];

      this.apiService.deleteRecipe(id).subscribe(() => {
      this.router.navigate(['/catalog/recipes']);
      })
    })
}


onToggleEdit(): void {
  this.showEditRecipeForm = !this.showEditRecipeForm;
}

onToggleComment(): void {
  this.showCommentSection = !this.showCommentSection;
}

updateRecipeHandler(): void {
 if(this.form.invalid) {
    return;
  }

  this.activatedRoute.params.subscribe((data) => {
  const id = data['recipeId'];

  
  this.recipeDetails = this.form.value as RecipeDetails;
  const {name, ingredients, steps, img} = this.recipeDetails;


  this.apiService.updateRecipe(id, name, ingredients, steps, img).subscribe((recipe) => {
  //  console.log(recipe); //на update изпраща ingredients и steps като обекти
  
    this.recipe = recipe;
    this.onToggleEdit();
  });
});
}


onCancelEditRecipe(event: Event) {
  event.preventDefault();
  this.onToggleEdit();
}
}


