import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateRecipeComponent } from "./create-recipe/create-recipe.component";
import { SingleRecipeComponent } from "./single-recipe/single-recipe.component";
import { MainComponent } from "./main/main.component";


const routes: Routes = [
    {path: 'create-recipe', component: CreateRecipeComponent}, //add guard for logged-in users
    {path: 'recipes',
        children: [ 
            {path: '', pathMatch: 'full', component: MainComponent},
            {path: ':id', component: SingleRecipeComponent}, //!?
        ],
    },
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CatalogRoutingModule {}