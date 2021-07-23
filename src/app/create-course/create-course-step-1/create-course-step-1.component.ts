import { Observable } from 'rxjs';
import { CoursesService } from './../../services/courses.service';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { courseTitleValidator } from '../../validators/course-title.validator';
import { filter } from 'rxjs/operators';

interface CourseCategory {
  code: string;
  description: string;
}

@Component({
  selector: 'create-course-step-1',
  templateUrl: './create-course-step-1.component.html',
  styleUrls: ['./create-course-step-1.component.scss']
})
export class CreateCourseStep1Component implements OnInit {

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
    longDescription: ['', [Validators.required, Validators.minLength(3)]]
  });

  courseCategories$: Observable<CourseCategory>;

  constructor(
    private fb: FormBuilder,
    private coursesService: CoursesService
  ) {}

  ngOnInit() {
    this.courseCategories$ = this.coursesService.findCourseCategories();

    const draft = localStorage.getItem("STEP_1");
    if (draft) {
      this.form.setValue(JSON.parse(draft))
    }

    // set the value in LS if form receive a new valid value
    this.form.valueChanges
      .pipe(
        // only if form is valid we will proces the data
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

}
