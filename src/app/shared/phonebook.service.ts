import {
  Injectable
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import {
  AngularFireDatabase,
  AngularFireList
} from "angularfire2/database";
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class PhonebookService {

  constructor(public firebase: AngularFireDatabase) {}
  phoneList: AngularFireList < any > ;
  currentUser: number;
  form = new FormGroup({
    $key: new FormControl(null),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl(""),
    email: new FormControl('', Validators.email),
    mobile: new FormControl('', [Validators.required, Validators.minLength(8)]),
    type: new FormControl("")
  });

  costFirstNameEnc: string;
  costLastNameEnc: string;
  costEmailEnc: string;
  costMobileEnc: string;
  costFirstNameDec: string;
  costEmailEncDec: string;
  costMobileDec: string;

  getCustomers() {
    this.phoneList = this.firebase.list(this.currentUser.toString() + "userDBbeta");
    return this.phoneList.snapshotChanges();
  }
  insertCustomer(customer) {
    this.costFirstNameEnc = (CryptoJS.AES.encrypt(customer.firstName.toString(), "9&:ks=mGK2XLB.hq")).toString(),
    this.costLastNameEnc = (CryptoJS.AES.encrypt(customer.lastName.toString(), "9&:ks=mGK2XLB.hq")).toString(),
      this.costEmailEnc = (CryptoJS.AES.encrypt(customer.email.toString(), "9&:ks=mGK2XLB.hq")).toString(),
      this.costMobileEnc = CryptoJS.AES.encrypt(customer.mobile.toString(), "9&:ks=mGK2XLB.hq").toString(),
        this.phoneList.push({
          firstName: this.costFirstNameEnc,
          lastName: this.costLastNameEnc,
          email: this.costEmailEnc,
          mobile: this.costMobileEnc,
          type: customer.type
        });
      }
    populateForm(customer) {
      this.form.setValue(customer);
    }
    updateCustomer(customer) {
      this.costFirstNameEnc = (CryptoJS.AES.encrypt(customer.firstName, "9&:ks=mGK2XLB.hq")).toString(),
        this.costLastNameEnc = (CryptoJS.AES.encrypt(customer.lastName, "9&:ks=mGK2XLB.hq")).toString(),
        this.costEmailEnc = (CryptoJS.AES.encrypt(customer.email, "9&:ks=mGK2XLB.hq")).toString(),
        this.costMobileEnc = CryptoJS.AES.encrypt(customer.mobile, "9&:ks=mGK2XLB.hq").toString(),
        this.phoneList.update(customer.$key, {
          firstName: this.costFirstNameEnc,
          lastName: this.costLastNameEnc,
          email: this.costEmailEnc,
          mobile: this.costMobileEnc,
          type: customer.type
        });
    }
    deleteCustomer($key: string) {
      this.phoneList.remove($key);
    }
  }
