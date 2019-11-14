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
          this.emailDec = CryptoJS.AES.decrypt(item.payload.val().email, "9&:ks=mGK2XLB.hq").toString(CryptoJS.enc.Utf8);
          this.fullNameDec = CryptoJS.AES.decrypt(item.payload.val().fullName, "9&:ks=mGK2XLB.hq").toString(CryptoJS.enc.Utf8);
          this.mobileDec = CryptoJS.AES.decrypt(item.payload.val().mobile,"9&:ks=mGK2XLB.hq").toString(CryptoJS.enc.Utf8);
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

  filterCondition(contact){
    let words = contact.fullName.toLowerCase().split(" ");
    for(let word of words){
      if(word.startsWith(this.searchText.toLowerCase())) return true;
    }
    if(contact.email.toLowerCase().startsWith(this.searchText.toLowerCase())) return true;
    if(contact.mobile.toLowerCase().startsWith(this.searchText.toLowerCase())) return true;
    if(this.searchText == "") return true;
    return false;
  }

}
