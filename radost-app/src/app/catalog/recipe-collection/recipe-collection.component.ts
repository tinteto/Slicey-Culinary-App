import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Recipe } from 'src/app/types/recipe';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-recipe-collection',
  templateUrl: './recipe-collection.component.html',
  styleUrls: ['./recipe-collection.component.css']
})

export class RecipeCollectionComponent implements OnInit {
 recipes: Recipe[] | null = [];

get isLoggedIn(): boolean {
 return this.userService.isLogged;
}


  constructor (private apiService: ApiService, private userService: UserService) {}

 ngOnInit(): void {
  this.apiService.getMostRecentRecipes().subscribe((recipes) => {
    console.log(recipes);
    this.recipes = recipes;
  });
}
}
