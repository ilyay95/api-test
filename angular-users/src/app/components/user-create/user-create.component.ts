import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  user = {
    firstName: '',
    age: '',
  };
  submitted = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  createUser(): void {
    const data = {
      user: {
        firstName: this.user.firstName,
        age: this.user.age
      }
    };

    this.userService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newUser(): void {
    this.submitted = false;
    this.user = {
      firstName: '',
      age: ''
    };
  }

}
