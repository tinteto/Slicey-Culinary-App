
export interface Recipe {
        _ownerId: string, //user owner id
        name: string,
        img: string,
        ingredients: string[],
        steps: string[],
        _createdOn: number,
        _id: string,   //recipeId
}

export interface RecipeDetails {
        name: string,
        ingredients: string, 
        steps: string, 
        img: string,
}