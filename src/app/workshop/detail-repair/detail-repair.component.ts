import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderTab } from '../../models/HeaderTab';
import { RepairsService } from '../../services/repairs.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-detail-repair',
  templateUrl: './detail-repair.component.html',
  styleUrls: ['./detail-repair.component.css'],
})
export class DetailRepairComponent implements OnInit {
  repairDetailTabs: HeaderTab[] = [];
  repairId: any;
  repair: any = {};
  loading: boolean = true;
  error: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private repairsService: RepairsService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      //Get the id from the route
      this.repairId = params.id;
    });
    //Get the repair data from the db (refetch)
    this.repairsService.getRepair(this.repairId).refetch();

    this.repairsService
      .getRepair(this.repairId)
      .valueChanges.subscribe((result) => {
        this.repair = result?.data?.getRepair;
        this.loading = result.loading;
        this.error = result.error;
      });

    this.repairDetailTabs = [
      {
        active: false,
        icon: 'bx bx-food-menu',
        navigate: '/repairs',
        tooltip: 'Usuarios',
      },
      {
        active: true,
        icon: 'bx bx-health',
        navigate: `/repairs/detail/${this.repairId}`,
        tooltip: 'Detalle',
      },
    ];
  }

  public openPDF(): void {
    let DATA = document.getElementById('detail-repair');

    html2canvas(DATA!).then((canvas) => {
      let fileWidth = 208;
      let pageHeight = 295;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      let heightLeft = fileHeight;

      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      heightLeft -= pageHeight;
      while (heightLeft >= 0) {
        position = heightLeft - fileHeight;
        PDF.addPage();
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
        heightLeft -= pageHeight;
      }

      PDF.save(`${this.repair.id}.pdf`);
    });
  }
}
