import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ActivatedRoute } from '@angular/router';
import { GroupService } from 'src/app/services/group.service';
import { UserService } from 'src/app/services/user.service';
import { ConnectionService } from 'src/app/services/connection.service';

@Component({
  selector: 'app-base',
  template: '',
  styles: []
})

export class BaseComponent implements OnInit {
  useree = this.userService.users;
  currentGroup = null;
  user: any;
  results: any;
  res: any;

  constructor(public router: Router,
    public userService: UserService,
    public groupService: GroupService,
    public connectionServise: ConnectionService,
    public route: ActivatedRoute) { }

  ngOnInit(): void {
    
  }

  getGroup(id): void {
    this.groupService.read(id)
      .subscribe(
        data => {
          this.currentGroup = data['group'];
          this.results = this.userService.users.filter(x => !this.currentGroup.users.some(y => x.firstName === y.firstName));
        },
        error => {
          console.log(error);
        });
  }
  
  createConnect(user): void {
    const data = {
      connection: {
        groupId: this.currentGroup.id,
        userId:  user.id
      }
    };
    this.connectionServise.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.getGroup(this.route.snapshot.paramMap.get('id'));
          this.userService.readUsers();
        },
        error => {
          console.log(error);
        });     
  }
  
  deleteConnect(user): void {
    this.connectionServise.delete(user)
      .subscribe(
        response => {
          console.log(response);
          this.getGroup(this.route.snapshot.paramMap.get('id'));
          this.userService.readUsers();
        },
        error => {
          console.log(error);
        });
  }

}
