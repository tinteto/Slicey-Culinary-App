import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';
import { SingleRecipeComponent } from './single-recipe/single-recipe.component';
import { RecipeCollectionComponent } from './recipe-collection/recipe-collection.component';
import { CatalogRoutingModule } from './catalog-routing.module';
import { MainComponent } from './main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    SingleRecipeComponent,
    CreateRecipeComponent,
    RecipeCollectionComponent,
    MainComponent,
  ],
  imports: [
    CommonModule, CatalogRoutingModule, FormsModule, ReactiveFormsModule, //import SharedModule
  ]
})
export class CatalogModule { }
