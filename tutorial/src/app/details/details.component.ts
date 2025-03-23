import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housinglocation';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  standalone: true
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService: HousingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;

  constructor(){
    const housingLocationId: number = +this.route.snapshot.params['id'];
    this.housingService.getHousingLocationById(housingLocationId).then((housingLocations: HousingLocation[]) => {
      this.housingLocation = housingLocations[0];
    });
    console.log(this.housingLocation?.toString());
  }

  applyForm: FormGroup = new FormGroup({
    firstName:  new FormControl(),
    lastName:   new FormControl(),
    email:      new FormControl()
  });

  submitApplication(): void{
    this.housingService.submitApplication(
      this.applyForm.value.firstName,
      this.applyForm.value.lastName,
      this.applyForm.value.email
    );
  }
}
