import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfessionService } from 'src/app/services/profession.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  currentUser = null;
  message = '';
  professions: any;
  deleteMessage = 'Are you sure you want to delete the user';
  currentProduct = null;
  
  constructor(
    private userService: UserService,
    private professionService: ProfessionService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getUser(this.route.snapshot.paramMap.get('id'));
    this.readProfessions();
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

  readProfessions(): void {
    this.professionService.readAllProfession()
    .subscribe(
      data => {
        this.professions = data['professions'];
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

  setCurrentProduct(): void {
    this.currentProduct = !this.currentProduct;
  }

  updateUser(): void {
    const data = {
      user: {
        firstName: this.currentUser.firstName,
        age: this.currentUser.age,
        professionId: this.currentUser.professionId,
        logo: this.currentUser.logo
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

  confirmMethod(): void {
    if(confirm(this.deleteMessage)) {
      this.deleteUser();
    }
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
