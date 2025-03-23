import { Injectable } from '@angular/core';
import { HousingLocation } from './housinglocation';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  readonly apiUrl   =   'http://localhost:3000/locations';

  /*HousingLocationリストをすべて返す*/
  async getAllHousingLocationList(): Promise<HousingLocation[]>{
    const locations = await fetch(this.apiUrl);
    return (await locations.json()) ?? [];
  }

  /*Idをキーに検索し、合致したHousingLocationを返す*/
  async getHousingLocationById(id: number): Promise<HousingLocation[]>{
    const location = await fetch(`${this.apiUrl}?id=${id}`);
    return (await location.json()) ?? {}
  }

  submitApplication(firstName: string, lastName: string, email: string){
    console.log(
      `Home application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}`
    );
  }

  housingLocationList: HousingLocation[] = [];
}
