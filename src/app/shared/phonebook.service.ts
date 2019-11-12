import { Injectable } from '@angular/core';
import { FormControl , FormGroup , Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";


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

         getCustomers(){
                 this.phoneList = this.firebase.list('contacts');
                 return this.phoneList.snapshotChanges();
         }
         insertCustomer(customer){
          this.phoneList.push({
                  fullName: customer.fullName,
                  email: customer.email,
                  mobile: customer.mobile
           });
  }
  populateForm(customer){
        this.form.setValue(customer);
      }
      updateCustomer(customer){
        this.phoneList.update(customer.$key,{
           fullName:  customer.fullName,
            email: customer.email,
            mobile: customer.mobile
        });
      }
      deleteCustomer($key: string){
        this.phoneList.remove($key);
      }
}