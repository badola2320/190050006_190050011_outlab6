import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RecordsService } from '../records.service';
import { Data } from '../data';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit{

  user = this.fb.group({
    name: [, [Validators.required]],
    email: [, [Validators.email, Validators.required]],
    feedback: [,[Validators.required]],
    comment: []
  });

  getData: Data = {
    name: '',
    email: '',
    feedback: '',
    comment: ''
  };

  postData: Data = {
    name: '',
    email: '',
    feedback: '',
    comment: ''
  };
  
  constructor(private fb: FormBuilder, private service: RecordsService) { }
  
  ngOnInit(){
    this.onInitialize();
  }

  onInitialize() {
    this.service.getData().subscribe(data => this.getData = data );
    this.service.getData().subscribe(data => this.postData = data );
  }

  onSubmit() {
    if (this.user.valid) {
      this.service.postData(this.postData)
      .subscribe(
        data => {console.log('User', data), window.alert("Submitted successfully!")},
        error => { console.log('Error: ', error) , window.alert("Invalid Data! Please enter correct information.")}
        );
    }
    else window.alert("Submission failed!");
  }
}