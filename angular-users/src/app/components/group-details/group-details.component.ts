import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from 'src/app/services/group.service';
import { UserService } from 'src/app/services/user.service';
import { ConnectionService } from 'src/app/services/connection.service';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/base/base.component';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-group-details',
    templateUrl: './group-details.component.html',
    styleUrls: ['./group-details.component.css']
})
export class GroupDetailsComponent extends BaseComponent implements OnInit {
    deleteMessage = 'Are you sure you want to delete the group';

    constructor(public router: Router,
        public userService: UserService,
        public groupService: GroupService,
        public connectionServise: ConnectionService,
        public route: ActivatedRoute,
        private toastr: ToastrService) {
        super(router, userService, groupService, connectionServise, route);
    }

    ngOnInit(): void {
        this.userService.readUsers();
        this.getGroup(this.route.snapshot.paramMap.get('id'));
    }

    deleteUserFromGroup(user): void {
        this.deleteConnect(user.connections.id);
    }

    addUserInGroup(user): void {
        this.createConnect(user);
    }

    getGroup(id): void {
        this.groupService.read(id)
            .subscribe(
                data => {
                    this.currentGroup = data['group'];

                    if (this.userService.users) {
                        this.results = this.userService.users.filter(x => !this.currentGroup.users.some(y => x.firstName === y.firstName));
                    }
                },
                error => {
                    this.toastr.error(`${error.message}`, 'Group read error', {
                        timeOut: 3000
                    });
                });
    }

    confirmMethod(): void {
        if (confirm(this.deleteMessage)) {
            this.deleteGroup();
        }
    }

    deleteGroup(): void {
        this.groupService.delete(this.currentGroup.id)
            .subscribe(
                response => {
                    console.log(response);
                    this.router.navigate(['/groups']);
                    this.toastr.success('Group delete');

                },
                error => {
                    this.toastr.error(`${error.message}`, 'Group deletion error', {
                        timeOut: 3000
                    });
                });
    }
}
