import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousinglocationComponent } from '../housinglocation/housinglocation.component';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule,HousinglocationComponent,RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true
})
export class HomeComponent {

  /*housing.service.tsをDIする*/
  constructor(housingService: HousingService){
    this.housingLocationList = housingService.getAllHousingLocationList();
  }
  housingLocationList: HousingLocation[] = [];
}
