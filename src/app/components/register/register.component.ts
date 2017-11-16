import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user'
import { Router } from '@angular/router';

import { AuthenticationService } from '../../auth/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public model = new User(null,'','','','','','');
  public error = null;
  public loading = false;

  constructor(private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  register(){
    if(this.model.password != this.model.confirmPassword){
      this.error = 'Las contraseñas no coinciden';
    } else {
        this.loading = true;
        this.authenticationService.register(this.model)
            .subscribe(response => {
                if (response.code === 200) {
                    // register successful
                    this.authenticationService.login(this.model.userName, this.model.password)
                    .subscribe(result => {
                        if (result === true) {
                            // login successful
                            this.router.navigate(['productos']);
                        } else {
                            // login failed
                            this.error = 'Username or password is incorrect';
                            this.loading = false;
                        }
                    });
                    this.router.navigate(['productos']);
                } else {
                    // register failed
                    this.error = response.message;
                    this.loading = false;
                }
            });
            
    }
  }
}