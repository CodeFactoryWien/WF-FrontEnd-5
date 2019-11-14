import { Injectable } from '@angular/core';
import { FormControl , FormGroup , Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import * as CryptoJS from 'crypto-js';

@Injectable({
 providedIn: 'root'
})
export class PhonebookService {

 constructor(public firebase: AngularFireDatabase) { }
         phoneList: AngularFireList<any>;
          currentUser: number;
         form = new FormGroup({
     $key: new FormControl(null),
     fullName: new FormControl('', Validators.required),
     email: new FormControl('', Validators.email),
     mobile: new FormControl('', [Validators.required, Validators.minLength(8)])
         });

  costFullNameEnc: string;
  costEmailEnc: string;
  costMobileEnc: string;
  costFullNameDec: string;
  costEmailEncDec: string;
  costMobileDec: string;

getCustomers() {
  this.phoneList = this.firebase.list(this.currentUser.toString()+"userDB");
    return this.phoneList.snapshotChanges();
  }
  insertCustomer(customer) {
    this.costFullNameEnc = (CryptoJS.AES.encrypt(customer.fullName.toString(), "9&:ks=mGK2XLB.hq")).toString(),
      this.costEmailEnc = (CryptoJS.AES.encrypt(customer.email.toString(), "9&:ks=mGK2XLB.hq")).toString(),
      this.costMobileEnc = CryptoJS.AES.encrypt(customer.mobile.toString(), "9&:ks=mGK2XLB.hq").toString(),
        console.log(this.costFullNameEnc),
    this.phoneList.push({
      fullName: this.costFullNameEnc,
      email:  this.costEmailEnc,
      mobile: this.costMobileEnc
    });
  }
populateForm(customer) {
    this.form.setValue(customer);
  }
updateCustomer(customer) {
  this.costFullNameEnc = (CryptoJS.AES.encrypt(customer.fullName, "9&:ks=mGK2XLB.hq")).toString(),
    this.costEmailEnc = (CryptoJS.AES.encrypt(customer.email, "9&:ks=mGK2XLB.hq")).toString(),
    this.costMobileEnc = CryptoJS.AES.encrypt(customer.mobile, "9&:ks=mGK2XLB.hq").toString(),
  this.phoneList.update(customer.$key, {
    fullName: this.costFullNameEnc,
    email:  this.costEmailEnc,
    mobile: this.costMobileEnc
    });
  }
deleteCustomer($key: string) {
    this.phoneList.remove($key);
  }
}
