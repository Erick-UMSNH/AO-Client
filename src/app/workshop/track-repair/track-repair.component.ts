import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderTab } from '../../models/HeaderTab';
import { RepairsService } from '../../services/repairs.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ClipboardService } from 'ngx-clipboard';
import { CLIENT } from '../../config';

@Component({
  selector: 'app-track-repair',
  templateUrl: './track-repair.component.html',
  styleUrls: ['./track-repair.component.css'],
})
export class TrackRepairComponent implements OnInit {
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
  }
}
