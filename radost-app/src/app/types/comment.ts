import { Recipe } from "./recipe";

export interface Comment {
    _ownerId: string,
    content: string,
    recipeId: Recipe,
    _createdOn: number,
    _id: string,
 }