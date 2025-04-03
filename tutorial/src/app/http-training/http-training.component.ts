import { Component, OnInit } from '@angular/core';
import { HttpTrainingService } from '../http-training.service';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule, } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider'

@Component({
  selector: 'app-http-training',
  imports:[
    CommonModule,
    MatSlideToggleModule,
    MatSliderModule
    
    ],
  templateUrl: './http-training.component.html',
  styleUrls: ['./http-training.component.css'],
  standalone: true
})
export class HttpTrainingComponent implements OnInit{

  constructor(private httpService: HttpTrainingService){
  }

  ngOnInit(): void {
    this.httpService.getShipPlanList();
    this.httpService.getArrivalPlanList();
  }

}
