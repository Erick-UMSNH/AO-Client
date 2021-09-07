import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { HeaderTab } from '../../models/HeaderTab';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css', '../../css/tables.css'],
})
export class UsersComponent implements OnInit {
  usersTabs: HeaderTab[];
  users: any[] = [];
  userName: string = '';
  loading: boolean = true;
  error: any;
  showConfirm: boolean = false;
  selectedUserId: string = '';
  p: number = 1;
  filterUser: string = '';

  constructor(
    private router: Router,
    private usersService: UsersService,
    private toastr: ToastrService
  ) {
    this.usersTabs = [
      {
        active: true,
        icon: 'bx bx-food-menu',
        navigate: '/users',
        tooltip: 'Usuarios',
      },
      {
        active: false,
        icon: 'bx bxs-user-circle',
        navigate: '/users/new',
        tooltip: 'Nuevo',
      },
    ];
  }

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers = () => {
    //Refetch the data (update values)
    this.usersService.getUsers().refetch();
    //Apply the results
    this.usersService.getUsers().valueChanges.subscribe((result) => {
      this.users = result?.data?.getUsers;
      this.loading = result.loading;
      this.error = result.error;
    });
  };

  userDetail = (id: string) => {
    this.router.navigate([`/users/detail/${id}`]);
  };

  editUser = (id: string) => {
    this.router.navigate([`/users/edit/${id}`]);
  };

  deleteUser = () => {
    //Start loading
    this.loading = true;
    //Delete user
    this.usersService.deleteUser(this.selectedUserId).subscribe(
      (result) => {
        //Stop loading
        this.loading = false;
        //Send toast
        this.toastr.success('', 'Usuario eliminado!');
        //Refresh users list
        this.getUsers();
      },
      (error) => {
        //Send toast
        this.toastr.error('', 'Ha ocurrido un error!');
        console.log('An error has ocurred:', error);
      }
    );
  };

  openConfirm = (e: any, id: string) => {
    e.stopPropagation();
    this.selectedUserId = id;
  };
}
