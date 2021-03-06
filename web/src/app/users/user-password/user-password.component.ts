import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Logger } from '../../../x-shared/app/shared';
import { User, UserService } from '../../../x-shared/app/users';

import { ChangePasswordComponent } from './change-password';

@Component({
    selector: 'user',
    templateUrl: './user-password.component.html',
    styleUrls: ['./user-password.component.scss']
})
export class UserPasswordComponent implements OnInit {
    user: User;

    constructor(public store: UserService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _location: Location) { }

    ngOnInit() {
        this._route.params
            .switchMap((params: Params) => this.store.get(params['id']))
            .subscribe((data: any) => {
                this.user = this.store.newModel(data);
            });
    }

    submit(user: User) {
        if (confirm('Confirm password update of user "' + user.username + '" ?')) {
            this.store.update(user)
                .then(
                () => { },
                (error) => {
                    if (Logger.isEnabled) {
                        Logger.dir(error);
                    }
                    alert('An error occurred while updating a user.');
                }
                );
        }
    }

    cancel() {
        this._location.back();
    }

}
