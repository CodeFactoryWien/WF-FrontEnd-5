import { Component, OnInit } from '@angular/core';
import { PhonebookService  } from "../shared/phonebook.service";



@Component({
  selector: 'app-phone-book',
  templateUrl: './phone-book.component.html',
  styleUrls: ['./phone-book.component.scss']
})
export class PhoneBookComponent implements OnInit {

  constructor(private phonebookService:PhonebookService) { }
  submitted: boolean;
  showSuccessMessage: boolean;

  ngOnInit() {
  }

  onSubmit(){
    this.submitted = true;
    if(this.phonebookService.form.valid){
            if(this.phonebookService.form.get("$key").value == null ){                    
            this.phonebookService.insertCustomer(this.phonebookService.form.value);
        this.showSuccessMessage =true;// we set the property to true
        setTimeout(()=> this.showSuccessMessage=false,3000); // we used setTimeout here so after 3 second the showSuccessMessage value will be false
        this.submitted = false;
        this.phonebookService.form.reset();// the form will be empty after new record created
          } else {
            this.phonebookService.updateCustomer(this.phonebookService.form.value);
            this .showSuccessMessage = true;
           setTimeout(()=> this.showSuccessMessage=false ,3000);
           this.submitted = false;
            this.phonebookService.form.reset();
          }
    }
  }

}
