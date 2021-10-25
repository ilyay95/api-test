import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { BaseComponent} from 'src/app/base/base.component';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from 'src/app/services/group.service';
import { ConnectionService } from 'src/app/services/connection.service';

@Component({
  selector: 'app-connections-create',
  templateUrl: './connections-create.component.html',
  styleUrls: ['./connections-create.component.css']
})
export class ConnectionsCreateComponent extends BaseComponent implements OnInit {
  users = this.userService.users;
  results: any;
  name: string = '';
  submitted = false;
  groups: any
  
  constructor(public router: Router,
    public  userService: UserService,
    public groupService: GroupService,
    public connectionServise: ConnectionService,
    public route: ActivatedRoute
    ) {
    super(router,userService,groupService,connectionServise,route);
    
  }
  ngOnInit(): void {
    this.userService.readUsers();
   }
   
  createGroup(): void {
    if(this.name){
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
      },  
      error => {
        console.log(error);
      });   
    }
    else {
      alert('Enter group name');
    } 
  }

  navigate(): void {
    let id = this.user.user.id;
    this.router.navigate ([`groups/${id}`]);
  }
 
}
