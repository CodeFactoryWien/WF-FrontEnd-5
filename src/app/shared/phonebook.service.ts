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

         getContacts(){
                 this.phoneList = this.firebase.list('contacts');
                 return this.phoneList.snapshotChanges();
         }
         insertContact(contact){
          this.phoneList.push({
                  fullName: contact.fullName,
                  email: contact.email,
                  mobile: contact.mobile
           });
  }
  populateForm(contact){
        this.form.setValue(contact);
      }
      updateContact(contact){
        this.phoneList.update(contact.$key,{
           fullName:  contact.fullName,
            email: contact.email,
            mobile: contact.mobile
        });
      }
      deleteContact($key: string){
        this.phoneList.remove($key);
      }
}