import { Component, Input } from '@angular/core';
import { HousingLocation } from '../housinglocation';

@Component({
  selector: 'app-housinglocation',
  templateUrl: './housinglocation.component.html',
  styleUrls: ['./housinglocation.component.css'],
  standalone: true
})
export class HousinglocationComponent {
  @Input() housingLocation!: HousingLocation; //Non-Nullアサーションを使用するのは、初期値が不要のため
}
