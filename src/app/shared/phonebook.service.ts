import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class PhonebookService {

  constructor(private firebase: AngularFireDatabase) { }
  phoneList: AngularFireList<any>;

  form = new FormGroup({
    $key: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    mobile: new FormControl('', [Validators.required, Validators.minLength(8)])
  });
  costFullNameEnc: any;
  costEmailEnc: any;
  costMobileEnc: any;
  costFullNameDec: any;
  costEmailEncDec: any;
  costMobileDec: any;
getCustomers() {
    this.phoneList = this.firebase.list('contacts-test');
    return this.phoneList.snapshotChanges();
  }
insertCustomer(customer) {
    this.phoneList.push({
      fullName: CryptoJS.AES.encrypt(customer.fullName),
      email: CryptoJS.AES.encrypt(customer.email),
      mobile: CryptoJS.AES.encrypt(customer.mobile)
    });
  }
populateForm(customer) {
    this.form.setValue(customer);
  }
updateCustomer(customer) {
    this.phoneList.update(customer.$key, {
      fullName: CryptoJS.AES.decrypt(customer.fullName),
      email: CryptoJS.AES.decrypt(customer.email),
      mobile: CryptoJS.AES.decrypt(customer.mobile)
    });
  }
deleteCustomer($key: string) {
    this.phoneList.remove($key);
  }
}
