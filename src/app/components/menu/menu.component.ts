import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../auth/authentication.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  loading = false;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  model: any = {};
  error = '';

  constructor(private authenticationService: AuthenticationService,
    private _router: Router,) { }

  ngOnInit() {}

  login() {
      this.loading = true;
      this.authenticationService.login(this.model.username, this.model.password)
          .subscribe(result => {
              if (result === true) {
                  // login successful
                  this.loading = false;
                  this.error = null;
                  this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
              } else {
                  // login failed
                  this.error = 'Username or password is incorrect';
                  this.loading = false;
              }
          });
          
  }
  logout(){
    this.authenticationService.logout();
    this._router.navigate(['cv']);
  }
}

