import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from 'src/app/services/group.service';
import { UserService } from 'src/app/services/user.service';
import { ConnectionService } from 'src/app/services/connection.service';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css']
})
export class GroupDetailsComponent implements OnInit {

  users: any;
  currentGroup = null;
  user: any;
  results: any;
  res: any;

  constructor(
    private userService: UserService,
    private groupService : GroupService,
    private connectionServise : ConnectionService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.readUsers();
    this.getGroup(this.route.snapshot.paramMap.get('id'));
  }

  readUsers(): void {
    this.userService.readAll()
      .subscribe(
        data => {
          this.users = data['users'];
        },
        error => {
          console.log(error);
        });
  }

  getGroup(id): void {
    this.groupService.read(id)
      .subscribe(
        data => {
          this.currentGroup = data['group'];
          this.results = this.users.filter(x => !this.currentGroup.users.some(y => x.firstName === y.firstName));
        },
        error => {
          console.log(error);
        });
  }
  
  addUserInGroup(user): void{
    this.createConnect(user);
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
          this.readUsers();
        },
        error => {
          console.log(error);
        });   
        
  }
  
  deleteUserFromGroup(user): void {
    this.deleteConnect(user);
  }

  deleteConnect(user): void {
    this.connectionServise.delete(user.connections.id)
      .subscribe(
        response => {
          console.log(response);
          this.getGroup(this.route.snapshot.paramMap.get('id'));
          this.readUsers();
        },
        error => {
          console.log(error);
        });
  }

}
