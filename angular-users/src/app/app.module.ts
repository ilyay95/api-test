import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GroupDetailsComponent } from './components/group-details/group-details.component';
import { BaseComponent } from './base/base.component';
import { Base2Component } from './base/base2.component';
import { ConnectionsCreateComponent } from './components/connections-create/connections-create.component';
import { GroupListComponent } from './components/group-list/group-list.component';

@NgModule({
    declarations: [
        AppComponent,
        UserCreateComponent,
        UserDetailsComponent,
        UserListComponent,
        BaseComponent,
        Base2Component,
        GroupDetailsComponent,
        ConnectionsCreateComponent,
        GroupListComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        CommonModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
