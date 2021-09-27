import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  serviceQuery?: QueryRef<any>;
  private loggedIn = new BehaviorSubject<boolean>(false);
  private user = new BehaviorSubject<{}>({});

  constructor(
    private apollo: Apollo,
    private router: Router,
    private toastr: ToastrService
  ) {}

  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  get userInfo(): Observable<any> {
    return this.user.asObservable();
  }

  authenticateUser = (email: string, password: string) => {
    this.apollo
      .watchQuery<any>({
        query: gql`
          query authenticateUser($authEmail: String!, $authPassword: String!) {
            authenticateUser(email: $authEmail, password: $authPassword) {
              user {
                id
                name
                lastName
                role
                photo
              }
              token
            }
          }
        `,
        variables: {
          authEmail: email,
          authPassword: password,
        },
      })
      .valueChanges.subscribe(
        (result) => {
          console.log('Inside Autenthicate: ', result);
          this.loggedIn.next(true);
          this.user.next(result.data.authenticateUser.user);
          this.router.navigate(['/home']);
        },
        (error) => {
          if (error.message === 'Wrong password') {
            //Send toast
            this.toastr.warning('Contraseña incorrecta');
          } else if (error.message === 'User not found') {
            //Send toast
            this.toastr.warning('El usuario no existe');
          } else {
            //Send toast
            this.toastr.error('Ha ocurrido un error');
            console.log(error);
          }
        }
      );
  };

  checkSession = () => {
    this.apollo
      .watchQuery<any>({
        query: gql`
          query checkSession {
            checkSession {
              id
              name
              lastName
              role
              photo
            }
          }
        `,
      })
      .valueChanges.subscribe((result) => {
        console.log('Inside service check session: ', result);
        if (result.data.checkSession) {
          this.loggedIn.next(true);
          this.user.next(result.data.checkSession);
        }
      });
  };

  logoutUser = () => {
    this.apollo
      .watchQuery<any>({
        query: gql`
          query logoutUser {
            logoutUser
          }
        `,
      })
      .valueChanges.subscribe(
        (result) => {
          if (result.data.logoutUser) {
            //Set service to not logged
            this.loggedIn.next(false);
            //Set user to none
            this.user.next({});
            //Send toast
            this.toastr.info('Sesión cerrada');
            //Navigate to home
            this.router.navigate(['/home']);
          } else {
            //Sent toast
            this.toastr.error('No se pudo cerrar la sesión');
          }
        },
        (error) => {
          console.error('Something went wrong');
          //Send toast
          this.toastr.error('Algo salio mal');
        }
      );
  };
}
