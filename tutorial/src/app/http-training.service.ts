import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArrivalPlan } from './arrival-plan';
import { ShipPlan } from './ship-plan';

@Injectable({
  providedIn: 'root'
})
export class HttpTrainingService {

  API_URL: string = 'http://127.0.0.1:18080';
  constructor(private http: HttpClient) { }

  getArrivalPlanList(): ArrivalPlan[]{
    let arrivalplans!: ArrivalPlan[];
    this.http.get<ArrivalPlan[]>(this.API_URL + '/arrivalplan').subscribe({
      next: (response) =>{
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      }
    })
    return arrivalplans;
  }

  getShipPlanList(): ShipPlan[]{
    let shipplans!: ShipPlan[];
    this.http.get<ArrivalPlan[]>(this.API_URL + '/shipplan').subscribe({
      next: (response) =>{
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      }
    })
    return shipplans;
  }
}
