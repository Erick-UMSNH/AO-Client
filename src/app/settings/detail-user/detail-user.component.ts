import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderTab } from '../../models/HeaderTab';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css'],
})
export class DetailUserComponent implements OnInit {
  userDetailTabs: HeaderTab[] = [];
  userId: any;
  user: any = {};
  loading: boolean = true;
  error: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      //Get the id from the route
      this.userId = params.id;
    });
    //Get the user data from the db (refetch)
    this.usersService.getUser(this.userId).refetch();

    this.usersService.getUser(this.userId).valueChanges.subscribe((result) => {
      this.user = result?.data?.getUser;
      this.loading = result.loading;
      this.error = result.error;
    });

    this.userDetailTabs = [
      {
        active: false,
        icon: 'bx bx-food-menu',
        navigate: '/users',
        tooltip: 'Usuarios',
      },
      {
        active: true,
        icon: 'bx bx-health',
        navigate: `/users/detail/${this.userId}`,
        tooltip: 'Detalle',
      },
    ];
  }
}
