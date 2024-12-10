import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Recipe } from 'src/app/types/recipe';

@Component({
  selector: 'app-recipe-collection',
  templateUrl: './recipe-collection.component.html',
  styleUrls: ['./recipe-collection.component.css']
})

export class RecipeCollectionComponent implements OnInit {
 recipes: Recipe[] | null = []; //извиквам си рецептите от типа, за да ги разпознае темплейта, когато ги извиквам там

  constructor (private apiService: ApiService) {}

 ngOnInit(): void {
  this.apiService.getAllRecipes().subscribe((recipes) => {
    console.log(recipes);
    
    this.recipes = recipes;

    }
  )
}


}
