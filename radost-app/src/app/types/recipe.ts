import { Comment } from "./comment";

export interface Recipe {
        _ownerId: string, //user owner id
        name: string,
        img: string,
        ingredients: string[],
        steps: string[],
       // comments: Comment[], //? няма коментари на сървъра към рецептите
        _createdOn: number,
        _id: string,   //recipeId
}

export interface RecipeDetails {
        name: string,
        ingredients: string, //?
        steps: string, //?
        img: string,
}