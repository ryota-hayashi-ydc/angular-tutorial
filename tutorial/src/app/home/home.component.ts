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

  /*housing.service.tsをコンストラクタベースでDI*/
  constructor(housingService: HousingService){
    housingService.getAllHousingLocationList().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });
  }

  housingLocationList: HousingLocation[] = [];
  filteredLocationList: HousingLocation[] = [];

  filterLocation(text: string): void{
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }
    this.filteredLocationList = this.housingLocationList.filter(housingLocation =>{
      return housingLocation?.city.toLowerCase().includes(text.toLowerCase())// 都市名に検索語が含まれているもの
    });
  }
}
