import {Component, Input} from '@angular/core';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {catchError, finalize} from 'rxjs/operators';
import {AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator} from '@angular/forms';
import {noop, of} from 'rxjs';


@Component({
  selector: 'file-upload',
  templateUrl: "file-upload.component.html",
  styleUrls: ["file-upload.component.scss"]
})
export class FileUploadComponent {

  @Input() requiredFileType: string;

  fileName = '';
  fileUploadError = false;
  uploadProgress: number;

  constructor(private http: HttpClient) {

  }

  onFileSelected(event) {

    if (!event) return;

    const file: File = event.target.files[0];

    this.fileName = file.name;

    console.log(this.fileName);
    this.fileUploadError = false;

    // cr8 payload
    const formData = new FormData();
    formData.append("thumbnail", file);

    this.http.post("/api/thumbnail-upload", formData, {
      reportProgress: true,
      observe: 'events'
    })
      .pipe(
        catchError(error => {
          this.fileUploadError = true;
          return of(error);
        }),
        // after the upload is completed or throw an error
        finalize(() => {
          this.uploadProgress = null;
        })
      )
      .subscribe(event => {
        if (event.type == HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * (event.loaded / event.total));
        }
      });

  }

}
