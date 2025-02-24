import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdvisementService } from '../../services/advisement.service';
import { Advisement } from '../../models/advisement.model';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-advisements',
  imports: [CommonModule, DatePipe, RouterLink], 
  templateUrl: './advisements.component.html',
  styleUrls: ['./advisements.component.css']
})
export class AdvisementsComponent implements OnInit {
  publicAdvisements: Advisement[] = [];
  privateAdvisements: Advisement[] = [];

  constructor(private advisementService: AdvisementService) {}

  ngOnInit(): void {
    this.loadPublicAdvisements();
    this.loadPrivateAdvisements();
  }

  loadPublicAdvisements(): void {
    this.advisementService.getPublicAdvisements().subscribe(data => {
      this.publicAdvisements = data;
    });
  }

  loadPrivateAdvisements(): void {
    this.advisementService.getPrivateAdvisements().subscribe(data => {
      this.privateAdvisements = data;
    });
  }

  viewDetails(advisement: Advisement): void {
    console.log('Detalles de la consulta:', advisement);
    alert(`Detalles: ${advisement.content}`);
  }
}
