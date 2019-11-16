import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private firebase: AngularFireDatabase) { }
  userList: AngularFireList<any>;

  form = new FormGroup({
    $key: new FormControl(null),
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  getUser() {
    this.userList = this.firebase.list('Users');
    return this.userList.snapshotChanges();
  }
  insertUser(user) {
    this.userList.push({
      username: user.username,
      password: user.password
    });
  }
  populateForm(user) {
    this.form.setValue(user);
  }
  updateUser(user) {
    this.userList.update(user.$key, {
      username: user.username,
      password: user.password
    });
  }
  deleteUser($key: string) {
    this.userList.remove($key);
  }
}
