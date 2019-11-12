import { Component, OnInit } from '@angular/core';
import {PhonebookService} from "../shared/phonebook.service"

@Component({
  selector: 'app-phone-list',
  templateUrl: './phone-list.component.html',
  styleUrls: ['./phone-list.component.scss']
})
export class PhoneListComponent implements OnInit {

  constructor(private phonebookService:PhonebookService) { }

  ngOnInit() {
    this.phonebookService.getCustomers();
  }

}
