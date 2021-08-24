export class HeaderTab {
  active: boolean;
  icon: string;
  navigate: string;

  constructor(active: boolean, icon: string, navigate: string) {
    this.active = active;
    this.icon = icon;
    this.navigate = navigate;
  }
}
