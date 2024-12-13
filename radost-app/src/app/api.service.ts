import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from './types/recipe';
import { environment } from 'src/environments/environment.development';

const { apiUrl } = environment;
// const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // apiUrl = 'http://localhost:3030'; ако не искам да използвам environment
  constructor(private http: HttpClient) {}


  getAllRecipes() {
    return this.http.get<Recipe[]>(`${apiUrl}/data/recipes`); //получаваме [{}, {}, {}]
  }

  getSingleRecipeById(id: string) {
    return this.http.get<Recipe>(`${apiUrl}/data/recipes/${id}`);
  }


  createNewRecipe(name: string, ingredients: string, steps: string, img: string) { //!!  img
    const payload = { name, ingredients, steps, img };
    return this.http.post<Recipe>(`${apiUrl}/data/recipes`, payload);
  }
  

  updateRecipe(id: string, name: string, ingredients: string, steps: string, img: string  ) { //!!img
    const payload = { name, ingredients, steps, img };
    return this.http.put<Recipe>(`${apiUrl}/data/recipes/${id}` , payload);
  }


  deleteRecipe(id: string) {
    return this.http.delete<Recipe>(`${apiUrl}/data/recipes/${id}`)
  }



  //Advanced Retrieval
  getMostRecentRecipes() {
    return this.http.get<Recipe[]>(`${apiUrl}/data/recipes?select=_id%2Cname%2Cimg&sortBy=_createdOn%20desc&pageSize=3`);
  }


  searchRecipe(query: string) {
    return this.http.get<Recipe[]>(`${apiUrl}/data/recipes?where=name%20LIKE%20%22${query}%22`);
  }


  getAllCommentsForARecipe(id: string) {
    return this.http.get<Recipe>(`${apiUrl}/data/comments?where=recipeId%3D%22${id}%22`);
  }




}
