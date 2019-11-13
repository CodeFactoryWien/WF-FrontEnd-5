import { Component, OnInit } from '@angular/core';
import { PhonebookService } from "../shared/phonebook.service";
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-phone-list',
  templateUrl: './phone-list.component.html',
  styleUrls: ['./phone-list.component.scss']
})
export class PhoneListComponent implements OnInit {
  contactArray = [];
  searchText: string = "";
  emailDec: string;
  fullNameDec: string;
  mobileDec: string;
  constructor(private phonebookService: PhonebookService) { }

  ngOnInit() {
    this.phonebookService.getCustomers().subscribe(
      (list) => {
        this.contactArray = list.map((item) => {
          this.emailDec = CryptoJS.AES.decrypt(item.payload.val().email, "1234").toString(CryptoJS.enc.Utf8);
          this.fullNameDec = CryptoJS.AES.decrypt(item.payload.val().fullName, "1234").toString(CryptoJS.enc.Utf8);
          this.mobileDec = CryptoJS.AES.decrypt(item.payload.val().mobile,"1234").toString(CryptoJS.enc.Utf8);
          return {
            $key: item.key,
            email: this.emailDec,
            fullName: this.fullNameDec,
            mobile: this.mobileDec
          }
        })
      });;
  }
  onDelete($key) {
    if (confirm("Are you sure you want to delete this record?")) {
      this.phonebookService.deleteCustomer($key);
    }
  }
  filterCondition(customer){
    return customer.fullName.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1 ;
  }

}
