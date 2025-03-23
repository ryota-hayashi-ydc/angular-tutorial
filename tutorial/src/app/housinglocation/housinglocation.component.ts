import { Component, Input } from '@angular/core';
import { HousingLocation } from '../housinglocation';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-housinglocation',
  imports: [RouterModule],
  templateUrl: './housinglocation.component.html',
  styleUrls: ['./housinglocation.component.css'],
  standalone: true
})
export class HousinglocationComponent {
  @Input() housingLocation!: HousingLocation; //Non-Nullアサーションを使用するのは、初期値が不要のため
}
