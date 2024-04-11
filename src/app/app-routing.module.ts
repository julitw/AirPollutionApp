import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadingStrategy, PreloadAllModules } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AirPollutionWorldComponent } from "./air-pollution-world/air-pollution-world.component";
import { AboutComponent } from "./about/about.component";

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {path: 'world', component: AirPollutionWorldComponent},
    {path: 'about', component: AboutComponent},
    
   
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule],
})
export class AppRoutingModule {}
