import { Recipe } from "./recipe";

export interface Comment {
    _ownerId: string,
    content: string,
    recipeId: string,
    _createdOn: number,
    _id: string,
 }