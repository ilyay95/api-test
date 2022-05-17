import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ProfessionService } from 'src/app/services/profession.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-user-create',
    templateUrl: './user-create.component.html',
    styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
    user = {
        firstName: '',
        age: '',
        professionId: '',
        logo: ''
    };
    submitted = false;
    professions: any;

    constructor(
        private userService: UserService,
        private professionService: ProfessionService,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        this.readProfessions();
    }

    readProfessions(): void {
        this.professionService.readAllProfession()
            .subscribe(
                data => {
                    this.professions = data['professions'];
                },
                error => {
                    this.toastr.error(`${error.message}`, 'Profession read error', {
                        timeOut: 3000
                    });
                });
    }

    createUser(): void {
        const data = {
            user: {
                firstName: this.user.firstName,
                age: this.user.age,
                professionId: this.user.professionId,
                logo: this.user.logo
            }
        };

        this.userService.create(data)
            .subscribe(
                response => {
                    console.log(response);
                    this.submitted = true;
                    this.toastr.success('User created successfully');
                },
                error => {
                    this.toastr.error(`${error.error.details.body[0].message}`, 'User create error', {
                        timeOut: 3000
                    });
                });
    }
}
