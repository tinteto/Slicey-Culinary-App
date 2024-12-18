import { Recipe } from "./recipe";
import { AuthUser } from "./user";

export interface Comment {
    _ownerId: AuthUser, //id на създателя на коментара
    content: string,
    recipeId: Recipe[], //id на рецептата
    _createdOn: number, 
    _id: string, //id на коментара
 }