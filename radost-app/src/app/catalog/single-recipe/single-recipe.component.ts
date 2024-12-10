import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Recipe } from 'src/app/types/recipe';

@Component({
  selector: 'app-single-recipe',
  templateUrl: './single-recipe.component.html',
  styleUrls: ['./single-recipe.component.css']
})
export class SingleRecipeComponent implements OnInit {
  recipe = {} as Recipe;

  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute, private router: Router) {}

  
  ngOnInit(): void {

    this.activatedRoute.params.subscribe((data) => {
 
     const id = data['id']; //!

      this.apiService.getSingleRecipeById(id).subscribe((recipe) => {
        console.log(recipe);
        this.recipe = recipe;

      })
})
}

  onDeleteRecipe(): void {
    this.activatedRoute.params.subscribe((data) => {
      const id = data['id'];

      this.apiService.deleteRecipe(id).subscribe(() => {
        this.router.navigate(['/recipes']);
      })
    })

  }





  }


