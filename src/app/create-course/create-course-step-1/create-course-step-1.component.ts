import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {filter, tap} from 'rxjs/operators';
import {courseTitleValidator} from '../../validators/course-title.validator';
import {CoursesService} from '../../services/courses.service';

export default interface CourseCategory {
  code: string;
  description: string;
}

@Component({
  selector: 'create-course-step-1',
  templateUrl: './create-course-step-1.component.html',
  styleUrls: ['./create-course-step-1.component.scss']
})
export class CreateCourseStep1Component implements OnInit, AfterViewInit {

  form = this.fb.group({
    title: ['', {
      validators: [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(60)
      ],
      asyncValidators: [courseTitleValidator(this.coursesService)],
      updateOn: 'blur'
    }],
    releaseAt: [new Date(), Validators.required],
    category: ['BEGINNER', Validators.required],
    downloadAllowed: [false, Validators.requiredTrue],
    longDescription: ['', [Validators.required, Validators.minLength(3)]],
    address: [null, Validators.required]
  });

  courseCategories$: Observable<CourseCategory>;

  constructor(
    private fb: FormBuilder,
    public coursesService: CoursesService
  ) {
  }

  // addressLine1: [null, [Validators.required]],
  // addressLine2: [null, [Validators.required]],
  // zipCode: [null, [Validators.required]],

  // city: [null, [Validators.required]]
  ngOnInit() {
    this.courseCategories$ = this.coursesService.findCourseCategories();
    console.log('🟢🟢',);
    const draft = localStorage.getItem("STEP_1");
    if (localStorage.getItem("STEP_1")) {
      this.form.setValue(JSON.parse(draft))
    }

    // set the value in LS if form receive a new valid value
    this.form.valueChanges
      .pipe(
        tap(e => {
          console.log('', e);
          console.log('🟥', this.form.valid);
        }),
        // only if form is valid we will process the data
        filter(() => this.form.valid)
      )
      .subscribe(val => {
        localStorage.setItem("STEP_1", JSON.stringify(val))
      })
  }

  get courseTitle() {
    // same result
    // return this.form.controls['title'];
    return this.form.get('title')
  }

  ngAfterViewInit(): void {
  }

}
