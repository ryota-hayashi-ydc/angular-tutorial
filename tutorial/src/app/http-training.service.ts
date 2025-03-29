import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShipPlan } from './ship-plan';

@Injectable({
  providedIn: 'root'
})
export class HttpTrainingService {

  API_URL: string = 'http://127.0.0.1:18080';
  constructor(private http: HttpClient) { }

  getShipPlanList(): ShipPlan[]{
    let shipplans: ShipPlan[]={};
    this.http.get(this.API_URL + '/shipplan').subscribe((result => {
      console.log(result);
    }))
    return shipplans;
  }
}
