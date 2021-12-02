import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ProfessionService } from 'src/app/services/profession.service';
import { Base2Component } from 'src/app/base/base2.component';
import { GroupService } from 'src/app/services/group.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent extends Base2Component implements OnInit {
    allUsers: any;
    professions: any;
    firstName: any;
    page;


    constructor(
        public userService: UserService,
        public professionService: ProfessionService,
        public groupService: GroupService,
        public router: Router,
        public route: ActivatedRoute,
        private toastr: ToastrService
    ) { super(userService, professionService, groupService, router, route) }

    ngOnInit(): void {
        this.readProfessions();
        this.getQueryParams();
    }

    ngAfterViewChecked(): void {
        if (this.activeClass == undefined) {
            this.activeClass = this.currentPage;
            this.index = this.currentPage + 1;
        }
    }

    readProfessions(): void {
        this.professionService.readAllProfession()
            .subscribe(
                data => {
                    this.professions = data['professions'];
                },
                error => {
                    this.toastr.error(`${error.message}`, 'Profession error', {
                        timeOut: 3000
                    });
                });
    }

    getNameQueryParams(): void {
        this.route.queryParams.subscribe((params) => {
            this.firstName = params.firstName;
        });
    }

    getQueryParams(): void {
        this.route.queryParams.subscribe((params) => {
            this.currentPage = params.currentPage;
            this.pageSize = params.pageSize;
            this.firstName = params.search;

            if (this.currentPage == undefined || this.currentPage <= 0 || this.currentPage > this.count) {
                this.currentPage = 1;
            }

            if (this.pageSize == undefined || this.pageSize <= 0) {
                this.pageSize = 1;
            }
            this.routeUsers();
            this.readUsers();
        });

    }

    readUsers(): void {
        this.userService.readAllQuery(this.currentPage, this.pageSize, this.firstName)
            .subscribe(
                data => {
                    this.allUsers = data['users'];
                    this.count = data['users'].count;
                    this.usersWhisProfession();
                    this.page = Math.ceil(this.count / this.pageSize);
                    this.pageArr = Array.from({ length: this.page }, (v, k) => k + 1);
                    this.currentPage = +this.currentPage;
                },
                error => {
                    console.log(error);
                    this.toastr.error(`${error.error.details.params[0].message}`, 'Error while reading users', {
                        timeOut: 3000
                    });
                });
    }

    usersWhisProfession(): void {
        this.allUsers = this.allUsers.rows.map((user) => {
            user.professionName = this.professions.find((profession) => user.professionId === profession.id).name;
            return user;
        })
    }

    searchByName(name): void {

        if (name) {
            this.firstName = name;
        } else {
            this.firstName = undefined;
        }

        this.currentPage = 1;
        this.routeUsers();
    }

    searchPage(page): void {
        this.searchPageBase(page);
        this.routeUsers();
    }

    minus(): void {
        if (this.currentPage > this.pageArr[0]) {
            this.minusBase();
            this.routeUsers();
        }
    }

    plus(): void {
        if (+this.currentPage < this.pageArr[this.pageArr.length - 1]) {
            this.plusBase();
            this.routeUsers();
        }
    }

    searchPageSize(): void {
        this.currentPage = 1;
        this.routeUsers();
    }

    routeUsers(): void {
        this.router.navigate(['/users'], { queryParams: { currentPage: this.currentPage, pageSize: this.pageSize, search: this.firstName } });
    }
}
