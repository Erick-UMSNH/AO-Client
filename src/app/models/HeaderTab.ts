export class HeaderTab {
  active: boolean;
  icon: string;
  navigate: string;
  tooltip: string;

  constructor(
    active: boolean,
    icon: string,
    navigate: string,
    tooltip: string
  ) {
    this.active = active;
    this.icon = icon;
    this.navigate = navigate;
    this.tooltip = tooltip;
  }
}
