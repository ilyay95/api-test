import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/base/base.component';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from 'src/app/services/group.service';
import { ConnectionService } from 'src/app/services/connection.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-connections-create',
    templateUrl: './connections-create.component.html',
    styleUrls: ['./connections-create.component.css']
})
export class ConnectionsCreateComponent extends BaseComponent implements OnInit {
    users = this.userService.users;
    name: string = '';
    submitted = false;

    constructor(public router: Router,
        public userService: UserService,
        public groupService: GroupService,
        public connectionServise: ConnectionService,
        public route: ActivatedRoute,
        private toastr: ToastrService
    ) {
        super(router, userService, groupService, connectionServise, route);

    }
    ngOnInit(): void {
        this.readUsers();
    }

    readUsers(): void {
        this.userService.readAll()
            .subscribe(
                data => {
                    this.users = data['users'];
                },
                error => {
                    this.toastr.error(`${error.error.details.params[0].message}`, 'User read error', {
                        timeOut: 3000
                    });
                });
    }

    createGroup(): void {

        if (this.name) {
            const data = {
                name: this.name
            };

            this.groupService.create(data)
                .subscribe(
                    response => {
                        this.user = response;
                        this.submitted = true;
                        this.getGroup(this.user.user.id);
                        this.navigate();
                        this.toastr.success('Group create');
                    },
                    error => {
                        console.log(error);
                        this.toastr.error(`${error.message}`, 'Group create error', {
                            timeOut: 3000
                        });
                    });
        } else {
            alert('Enter group name');
        }
    }

    navigate(): void {
        let id = this.user.user.id;
        this.router.navigate([`groups/${id}`]);
    }
}
