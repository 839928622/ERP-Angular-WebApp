import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { Company } from 'src/app/models/company';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class NewOrderComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  companyList: Company[];
  animals: ['adfafa', 'dfdasfasfs'];
  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required],
      animalContrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.route.data.subscribe(
      data => {
       this.companyList = data.companyList;
      }
    );
  }
  }


