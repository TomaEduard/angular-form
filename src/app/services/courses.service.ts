import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Course} from "../model/course";
import {Lesson} from "../model/lesson";


@Injectable()
export class CoursesService {

  constructor(private http: HttpClient) {

  }

  findCourseById(courseId: number): Observable<Course> {
    return this.http.get<Course>(`/api/courses/${courseId}`);
  }

  findCourseCategories() {
    return this.http.get(`/api/course-categories`)
      .pipe(
        map(res => res["categories"])
      );
  }

  // DetaliiOrdonatorResponse(sIdOrdonatorPrincipal: string, faraProgressBar?: boolean, faraSnackBar?: boolean): __Observable<__StrictHttpResponse<DetaliiOrdonator>> {
  //     let __params = this.newParams();
  //     let __headers = new HttpHeaders();
  //     let __body: any = null;
  //     return this.executa_request<DetaliiOrdonator>('GET', this.rootUrl + `/api/unitati/ordonator/${sIdOrdonatorPrincipal}`, __body, __headers, __params, 'json', 'DetaliiOrdonator', faraProgressBar, faraSnackBar);
  // }

  findAllCourses(): Observable<Course[]> {
    //     let __params = this.newParams();
    //     let __headers = new HttpHeaders();
    //     let __body: any = null;
    return this.http.get('/api/courses')
      .pipe(
        map(res => res['payload'])
      );
  }

  findAllCourseLessons(courseId: number): Observable<Lesson[]> {
    return this.http.get('/api/lessons', {
      params: new HttpParams()
        .set('courseId', courseId.toString())
        .set('pageNumber', "0")
        .set('pageSize', "1000")
    }).pipe(
      map(res => res["payload"])
    );
  }

  findLessons(
    courseId: number, filter = '', sortOrder = 'asc',
    pageNumber = 0, pageSize = 3): Observable<Lesson[]> {

    return this.http.get('/api/lessons', {
      params: new HttpParams()
        .set('courseId', courseId.toString())
        .set('filter', filter)
        .set('sortOrder', sortOrder)
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
    }).pipe(
      map(res => res["payload"])
    );
  }

}
