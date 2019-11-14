import { Component, OnInit } from '@angular/core';

import { UserServiceService } from '../user-service.service';
import { UserListComponent } from '../user-list/user-list.component';
@Component({
  selector: 'app-adduserform',
  templateUrl: './adduserform.component.html',
  styleUrls: ['./adduserform.component.css']
})
export class AdduserformComponent implements OnInit {

  constructor(public userServiceService: UserServiceService) { }
  submitted: boolean;
  showSuccessMessage: boolean;
  ngOnInit() {
  }
  onSubmit() {
    this.submitted = true;
    if (this.userServiceService.form.valid) {
      if (this.userServiceService.form.get("$key").value == null) {
        this.userServiceService.insertUser(this.userServiceService.form.value);
        this.showSuccessMessage = true;// we set the property to true
        setTimeout(() => this.showSuccessMessage = false, 3000); // we used setTimeout here so after 3 second the showSuccessMessage value will be false
        this.submitted = false;
        this.userServiceService.form.reset();// the form will be empty after new record created
      } else {
        this.userServiceService.updateUser(this.userServiceService.form.value);
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 3000);
        this.submitted = false;
        this.userServiceService.form.reset();
      }
    }
  }
}
