import { Component, OnInit } from '@angular/core';
import {PhonebookService} from "../shared/phonebook.service"

@Component({
  selector: 'app-phone-list',
  templateUrl: './phone-list.component.html',
  styleUrls: ['./phone-list.component.scss']
})
export class PhoneListComponent implements OnInit {
  contactArray =[];
  searchText:string = "";


  constructor(private phonebookService:PhonebookService) { }

  ngOnInit() {
    this.phonebookService.getCustomers().subscribe(
      (list) => {
              this.contactArray = list.map( (item) => {
                     return {
                             $key : item.key,
                             ...item.payload.val()
                     }
             })
      });;
  }
  onDelete($key){
    if(confirm("Are you sure you want to delete this record?")){
       this.phonebookService.deleteCustomer($key);
      }
  }
  filterCondition(customer){
    return customer.fullName.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1 ;
  }

}
