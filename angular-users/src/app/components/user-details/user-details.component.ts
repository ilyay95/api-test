import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  currentUser = null;
  message = '';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getUser(this.route.snapshot.paramMap.get('id'));
  }

  getUser(id): void {
    this.userService.read(id)
      .subscribe(
        data => {
          this.currentUser = data['user'];
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updateUser(): void {
    const data = {
      user: {
        firstName: this.currentUser.firstName,
        age: this.currentUser.age
      }
    };

    this.userService.update(this.currentUser.id, data)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The user was updated!';
        },
        error => {
          console.log(error);
        });
  }

  deleteUser(): void {
    this.userService.delete(this.currentUser.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/users']);
        },
        error => {
          console.log(error);
        });
  }
}
