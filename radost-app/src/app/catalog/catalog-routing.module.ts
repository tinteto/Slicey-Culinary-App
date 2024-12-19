import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateRecipeComponent } from "./create-recipe/create-recipe.component";
import { SingleRecipeComponent } from "./single-recipe/single-recipe.component";
import { MainComponent } from "./main/main.component";
import { AuthActivate } from "../guards/auth.activate";


const routes: Routes = [
    {path: 'recipes',
        children: [ 
            {path: '', pathMatch: 'full', component: MainComponent},
            {path: ':recipeId', component: SingleRecipeComponent},
        ],
    },

    {path: 'recipes-reload',
        children: [
            {path: ':recipeId', component: SingleRecipeComponent}
        ]
    },
    {path: 'create-recipe', component: CreateRecipeComponent, canActivate: [AuthActivate]},
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CatalogRoutingModule {}