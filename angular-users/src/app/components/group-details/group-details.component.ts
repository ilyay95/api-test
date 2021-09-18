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
          console.log(data);
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
          console.log(this.results)
        },
        error => {
          console.log(error);
        });
  }
  
  userInGroup(result): void{
    this.currentGroup.users.push(result);
    this.res= result.id
    this.results.splice(this.results.indexOf(this.res), 1);
    this.users.splice(this.results.indexOf(this.res), 1);
    this.createGroup(result)
  }

  createGroup(result): void {
    const data = {
      user: {
        groupId: this.currentGroup.id,
        userId:  result.id
      }
    };
    this.connectionServise.create(data)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });   
  }
  
  deleteGroup(user): void {
    this.connectionServise.delete(user.connections.id)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  userFromGroup(result): void{
    this.results.push(result);
    this.currentGroup.users.splice(this.currentGroup.users.indexOf(result), 1);
    this.deleteGroup(result)
  }

}
