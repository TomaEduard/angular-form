import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
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
    updateOn: 'change'
  });

  get price() {
    return this.form.get('price');
  }

  constructor(private fb: FormBuilder) {
  }

  set price(value: any) {
    this.price.setValue(value.toString());
  }

  ngOnInit() {
    this.price
      .valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(search => this.callAPI(search)),
      )
      .subscribe(val => {
        console.log('🎄', val);
      })


    // statusChange = daca este valid sau nu
    this.form.valueChanges
      .subscribe(val => {
        console.log('🟢', val);

        if (val.courseType == 'free' && this.price.enabled) {
          // emitEvent will not trigger onother value and
          // prevent infinite loop
          this.price.disable({onlySelf: true, emitEvent: false});
          this.price.setValue(0);
        }
        else if (val.courseType == 'premium' && this.price.disabled) {
          this.price.enable({emitEvent:false});
        }
      })
  }


  test(e: any) {
    console.log('😁😁😁', e);
  }

  callAPI(e: any) {
    console.log('😎', e);
    return of(e);
  }


}
