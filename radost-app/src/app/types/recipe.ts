export interface Recipe {
        _ownerId: string,
        name: string,
        img: string,
        ingredients: string[],
        steps: string[],
        _createdOn: number,
        _id: string,   
}

export interface RecipeDetails {
        name: string,
        ingredients: string,
        steps: string,
        img: string,
}