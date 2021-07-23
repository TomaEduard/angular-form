import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { createPromoRangeValidator } from '../../validators/date-range.validator';


@Component({
  selector: 'create-course-step-2',
  templateUrl: 'create-course-step-2.component.html',
  styleUrls: ['create-course-step-2.component.scss']
})
export class CreateCourseStep2Component implements OnInit {

  form = this.fb.group({
    courseType: ['premium', Validators.required],
    price: [null, [
      Validators.required,
      Validators.min(2),
      Validators.max(9999),
      Validators.pattern("[0-9]+")
    ]],
    promoStartAt: [null],
    promoEndAt: [null]
  }, {
    // return an error when promoEnd > promoStart
    validators: [createPromoRangeValidator()],
    updateOn: 'blur'
  });

  get price() {
    return this.form.controls['price']; 
  }

  ngOnInit() {
    this.form.valueChanges
      .subscribe(val => {

        const priceControl = this.form.controls["price"];

        if (val.courseType == 'free' && priceControl.enabled) {
          // emitEvent will not trigger onother value and
          // prevent infinite loop
          priceControl.disable({emitEvent: false});
          priceControl.setValue(0);
        } 
        else if (val.courseType == 'premium' && priceControl.disabled) {
          priceControl.enable({emitEvent:false});
        }
      })
  }

  constructor(private fb: FormBuilder) {

  }

}
