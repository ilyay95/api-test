import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GroupDetailsComponent } from './components/group-details/group-details.component';
import { BaseComponent } from './base/base.component';
import { ConnectionsCreateComponent } from './components/connections-create/connections-create.component';
import { GroupListComponent } from './components/group-list/group-list.component';

@NgModule({
  declarations: [
    AppComponent,
    UserCreateComponent,
    UserDetailsComponent,
    UserListComponent,
    BaseComponent,
    GroupDetailsComponent,
    ConnectionsCreateComponent,
    GroupListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
