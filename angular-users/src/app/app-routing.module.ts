import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { GroupDetailsComponent } from './components/group-details/group-details.component';
import { ConnectionsCreateComponent } from './components/connections-create/connections-create.component';
import { GroupListComponent } from './components/group-list/group-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: UserListComponent },
  { path: 'users/:id', component: UserDetailsComponent },
  { path: 'create', component: UserCreateComponent },
  { path: 'groups/:id', component: GroupDetailsComponent},
  { path: 'groupcreate', component: ConnectionsCreateComponent},
  { path: 'groups', component: GroupListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
