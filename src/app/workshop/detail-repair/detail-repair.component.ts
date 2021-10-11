import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderTab } from '../../models/HeaderTab';
import { RepairsService } from '../../services/repairs.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ClipboardService } from 'ngx-clipboard';
import { CLIENT } from '../../config';
import { TitleCasePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

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
    private repairsService: RepairsService,
    private clipboardApi: ClipboardService,
    private toastr: ToastrService
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
        icon: 'bx bxs-wrench',
        navigate: '/workshop',
        tooltip: 'Taller',
      },
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

      PDF.save(`Orden-${this.repair.order}.pdf`);
    });
  }

  copyData = () => {
    try {
      let repairDetails: string[] = [];
      let titlecase = new TitleCasePipe();
      let timeOfDay =
        new Date().getHours() < 12 ? 'Buenos días' : 'Buenas tardes';
      repairDetails.push(`*Datos de la orden:*\n`);
      repairDetails.push(`- Orden No. ${this.repair.order}\n`);
      repairDetails.push(`- Fecha: ${this.repair.date}\n`);
      repairDetails.push(`- Concepto: ${this.repair.concept}\n`);
      if (this.repair.comments !== '')
        repairDetails.push(`- Observaciones: ${this.repair.comments}\n\n`);
      repairDetails.push(`*Datos del vehículo:*\n`);
      repairDetails.push(
        `- ${this.repair.vehicle.brand} ${this.repair.vehicle.model}\n`
      );
      repairDetails.push(`- Placas: ${this.repair.vehicle.plate}\n\n`);

      repairDetails.push(
        `*Seguimiento:*\n${CLIENT.url}${CLIENT.port}/repairs/track/${this.repairId}\n\n`
      );
      repairDetails.push(`Automotriz Osnaya\n`);
      repairDetails.push(
        `Dirección: Bruno Patiño #89, Col. Nueva Chapultepec Sur, C.P. 58260\n`
      );
      repairDetails.push(`Teléfono: 443-5124991\n`);
      repairDetails.push(`Horario: 09:00 a 19:00 hrs\n`);
      repairDetails.push(`Email: afosnaya.ao@gmail.com\n\n`);
      repairDetails.push(
        `${timeOfDay} Sr@. ${titlecase.transform(
          this.repair.client.name
        )}, me comunicó de Automotriz Osnaya. Mande datos de orden de reparación, en el enlace puede usted saber el seguimiento de su vehículo. Estamos a sus ordenes!\n`
      );
      this.clipboardApi.copyFromContent(repairDetails.join(''));
      this.toastr.success(`Orden No. ${this.repair.order} copiada`);
    } catch (error) {
      console.error(error);
    }
  };
}
