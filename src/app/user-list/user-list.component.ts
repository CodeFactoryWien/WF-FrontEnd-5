import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { FakeBackendInterceptor } from '../_helpers/fake-backend';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userArray = [];
  showDeletedMessage: boolean;
  searchText: string = "";

  constructor(private userServiceService: UserServiceService) { }

  ngOnInit() {
    this.userServiceService.getUser().subscribe(
      (list) => {
        this.userArray = list.map((item) => {
          return {
            $key: item.key,
            ...item.payload.val()
          }
        })
      });

  }

  onDelete($key) {
    if (confirm("Are you sure you want to delete this record?")) {
      this.userServiceService.deleteUser($key);
      this.showDeletedMessage = true;
      setTimeout(() => this.showDeletedMessage = false, 3000)
    }
  }

  filterCondition(phoneNr) {
    return phoneNr.fullName.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;
  }


}
