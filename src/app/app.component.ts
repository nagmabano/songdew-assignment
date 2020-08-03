import { Component } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ageValidator } from './_helpers/age.validator';
import { nameValidator } from './_helpers/name.validator';
import { nameLengthValidator } from './_helpers/name-length.validator';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  registerForm: FormGroup;
    submitted = false;
    percentDone: number;
    uploadSuccess: boolean;


    constructor(private formBuilder: FormBuilder,
                private http: HttpClient) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            name: ['', [Validators.required, nameValidator, nameLengthValidator]],
            age: ['', [Validators.required, ageValidator]],
            email: ['', [Validators.required, Validators.email]],
            tags: ['', Validators.required]
        });
    }

    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
    }

    upload(files: File[]){
        console.log(files);
        if(files[0].size > 10000000){
            alert("File is too big!");
         } else {
        this.uploadAndProgress(files);
        }
      }
    
    //   basicUpload(files: File[]){
    //     var formData = new FormData();
    //     Array.from(files).forEach(f => formData.append('file', f))
    //     this.http.post('https://file.io', formData)
    //       .subscribe(event => {  
    //         console.log('done')
    //       })
    //   }

      uploadAndProgress(files: File[]){
        console.log(files)
        var formData = new FormData();
        Array.from(files).forEach(f => formData.append('file',f))
        
        this.http.post('https://file.io', formData, {reportProgress: true, observe: 'events'})
          .subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) {
              this.percentDone = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.uploadSuccess = true;
            }
        });

        
      }
}
