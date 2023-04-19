import { Component } from '@angular/core';
import { RequestLoginStudent } from 'src/app/models/login';
import { LoginService } from 'src/app/services/login.service';
import { first, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-student',
  templateUrl: './login-student.component.html',
  styleUrls: ['../login.component.scss']
})
export class LoginStudentComponent {

  public isBlock = false;
  public requestLoginStudent = {} as RequestLoginStudent;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  public doLogin(): void {
    this.isBlock = true;
    this.loginService.loginStudent(this.requestLoginStudent)
      .pipe(first(),
        finalize(() => {
          this.isBlock = false;
        }))
      .subscribe(
        () => {
          this.router.navigateByUrl('home');
        }
      );
  }

}
