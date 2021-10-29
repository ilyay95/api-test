import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/services/group.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  allGroups: any;
  filterGroups: any;
  name: any;
  group: any;

  constructor(public groupService: GroupService,
    public userService: UserService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getGroup()
  }

  getNameАromQueryParams(): void {
    this.route.queryParams.subscribe((params) => {
      this.name = { ...params.name, ...params };
      this.name = this.name.search;
      this.searchByName();
    });
  }

  searchByName(): void {
    if (this.name) {
      this.filterGroups = this.allGroups.filter((group) => {
        if (group.name.toLowerCase().indexOf(this.name.toLowerCase()) > -1) {
          return group;
        }
      })
      this.router.navigate(['/groups'], { queryParams: { search: this.name } });
    }
    else {
      this.filterGroups = this.allGroups;
      this.router.navigate(['/groups']);
    }
  }

  getGroup(): void {
    this.groupService.readAllGroup()
      .subscribe(
        data => {
          this.allGroups = data['groups'];
          this.getNameАromQueryParams();
        },
        error => {
          console.log(error);
        });
  }

}
