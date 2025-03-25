import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { DetailsComponent } from "./details/details.component";
import { Component } from "@angular/core";
import { HttpTrainingComponent } from "./http-training/http-training.component";

const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'HomePage'
    },
    {
        path: 'details/:id',
        component: DetailsComponent,
        title: 'HomeDetails'
    },
    {
        path: 'http',
        component: HttpTrainingComponent,
        title: 'HttpTraining'
    }
]

export default routeConfig;