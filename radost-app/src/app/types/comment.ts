import { Recipe } from "./recipe";

export interface Comment {
    _ownerId: string, //id на създателя на коментара
    content: string,
    recipeId: string, //id на рецептата
    _createdOn: number, 
    _id: string, //id на коментара
 }