import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/services/group.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProfessionService } from 'src/app/services/profession.service';
import { Base2Component } from 'src/app/base/base2.component';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-group-list',
    templateUrl: './group-list.component.html',
    styleUrls: ['./group-list.component.css']
})
export class GroupListComponent extends Base2Component implements OnInit {
    allGroups: any;
    name: any;
    page;
    allGroupsRows;

    constructor(public userService: UserService,
        public professionService: ProfessionService,
        public groupService: GroupService,
        public router: Router,
        public route: ActivatedRoute,
        private toastr: ToastrService
    ) { super(userService, professionService, groupService, router, route) }


    ngOnInit(): void {
        this.getQueryParams();
    }

    getQueryParams(): void {
        this.route.queryParams.subscribe((params) => {
            this.currentPage = params.currentPage;
            this.pageSize = params.pageSize;
            this.name = params.search;

            if (this.currentPage == undefined || this.currentPage <= 0 || this.currentPage > this.count) {
                this.currentPage = 1;
            }

            if (this.pageSize == undefined || this.pageSize <= 0 || this.pageSize > this.count) {
                this.pageSize = 1;
            }
            this.router.navigate(['/groups'], { queryParams: { currentPage: this.currentPage, pageSize: this.pageSize, search: this.name } });
            this.getGroup();
        });

    }

    searchByName(name): void {

        if (name) {
            this.pageSize = 1;
            this.name = name;
        } else {
            this.name = undefined;
        }

        this.currentPage = 1;
        this.routeGroups();
    }

    getGroup(): void {
        if (this.pageSize != undefined) {
            this.groupService.readAllQuery(this.currentPage, this.pageSize, this.name)
                .subscribe(
                    data => {
                        this.allGroups = data['groups'];
                        this.count = data['groups'].count;
                        this.page = Math.ceil(this.count / this.pageSize);
                        this.pageArr = Array.from({ length: this.page }, (v, k) => k + 1);
                        this.currentPage = +this.currentPage;
                        this.allGroupsRows = this.allGroups.rows;
                    },
                    error => {
                        this.toastr.error(`${error.message}`, 'Group read error', {
                            timeOut: 3000
                        });
                    });
        }
    }

    searchPage(page): void {
        this.searchPageBase(page);
        this.routeGroups();
    }

    minus(): void {
        if (this.currentPage > this.pageArr[0]) {
            this.minusBase();
            this.routeGroups();
        }
    }

    plus(): void {
        if (+this.currentPage < this.pageArr[this.pageArr.length - 1]) {
            this.plusBase();
            this.routeGroups();
        }
    }

    searchPageSize(): void {
        this.currentPage = 1;
        this.routeGroups();
    }

    routeGroups(): void {
        this.router.navigate(['/groups'], { queryParams: { currentPage: this.currentPage, pageSize: +this.pageSize, search: this.name } });
    }
}
