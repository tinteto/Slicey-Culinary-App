import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from './types/recipe';
import { environment } from 'src/environments/environment.development';
import { UserService } from './user/user.service';

const { apiUrl } = environment;
// const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // apiUrl = 'http://localhost:3030';
  constructor(private http: HttpClient) {}



  getAllRecipes() {
    return this.http.get<Recipe[]>(`${apiUrl}/data/recipes`);
  }

  getSingleRecipeById(recipeId: string) {
    return this.http.get<Recipe>(`${apiUrl}/data/recipes/${recipeId}`);
  }


  createNewRecipe(name: string, ingredients: string, steps: string, img: string) { 
    const payload = { name, ingredients, steps, img };
    return this.http.post<Recipe>(`${apiUrl}/data/recipes`, payload);
  }
  

  updateRecipe(recipeId: string, name: string, ingredients: string, steps: string, img: string  ) { 
    const payload = { name, ingredients, steps, img };
    return this.http.put<Recipe>(`${apiUrl}/data/recipes/${recipeId}` , payload);
  }


  deleteRecipe(recipeId: string) {
    return this.http.delete<Recipe>(`${apiUrl}/data/recipes/${recipeId}`)
  }



  //Advanced Retrieval
  
  getAllCommentsForARecipe(recipeId: string) {
    return this.http.get<Comment[]>(`${apiUrl}/data/comments?where=recipeId%3D%22${recipeId}%22`); 
  }

  postComment(recipeId: string, content: string) {
    const payload = { recipeId, content };
    return this.http.post<Comment>(`${apiUrl}/data/comments`, payload);
  }


  getMostRecentRecipes() {
    return this.http.get<Recipe[]>(`${apiUrl}/data/recipes?sortBy=_createdOn%20desc`);
  }



  searchRecipe(query: string) {
    return this.http.get<Recipe[]>(`${apiUrl}/data/recipes?where=name%20LIKE%20%22${query}%22`);
  }
}
