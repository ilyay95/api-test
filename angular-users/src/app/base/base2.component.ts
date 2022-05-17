import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from 'src/app/services/group.service';
import { UserService } from 'src/app/services/user.service';
import { ProfessionService } from 'src/app/services/profession.service';

@Component({
    selector: 'app-base',
    template: '',
    styles: []
})

export class Base2Component implements OnInit {
    currentPage;
    count;
    pageArr = [];
    pagesSizeArr = [1, 3, 5]
    pageSize = this.pagesSizeArr[0];
    activeClass;
    index;

    constructor(public userService: UserService,
        public professionService: ProfessionService,
        public groupService: GroupService,
        public router: Router,
        public route: ActivatedRoute,) { }

    ngOnInit(): void {
    }

    ngAfterViewChecked(): void {
        if (this.activeClass == undefined) {
            this.activeClass = this.currentPage;
            this.index = this.currentPage + 1;
        }
    }

    getАromQueryParams(): void {
        this.route.queryParams.subscribe((params) => {
            this.currentPage = params.currentPage;
            this.pageSize = params.pageSize;

            if (this.currentPage == undefined || this.currentPage <= 0 || this.currentPage > this.count) {
                this.currentPage = 1;
            }

            if (this.pageSize == undefined || this.pageSize <= 0 || this.pageSize > this.count) {
                this.pageSize = 1;
            }

            this.router.navigate(['/users'], { queryParams: { currentPage: this.currentPage, pageSize: this.pageSize } });
        });
    }

    searchPageBase(page): void {
        this.currentPage = page;
    }

    minusBase(): void {
        if (this.currentPage > this.pageArr[0]) {
            this.currentPage = this.currentPage - 1;
        }
    }

    plusBase(): void {
        if (+this.currentPage < this.pageArr[this.pageArr.length - 1]) {
            this.currentPage = this.currentPage + 1;
        }
    }

    searchPageSizeBase(pageSize): void {
        this.pageSize = +pageSize;

        if (this.pageSize >= 3 && this.currentPage > 2) {
            this.currentPage = 2;
        }

        this.getАromQueryParams();
    }
}
