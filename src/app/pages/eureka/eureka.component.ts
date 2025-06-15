import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartupCardComponent } from '../../components/startup-card.component';
import { NavbarComponent } from "../../components/navbar.component";
import { FooterComponent } from '../../components/footer.component';
import { ApiService, PastWinner } from '../../services/api.service';

@Component({
  selector: 'app-eureka',
  standalone: true,
  imports: [CommonModule, StartupCardComponent, NavbarComponent, FooterComponent],
  templateUrl: './eureka.component.html',
  styleUrls: ['./eureka.component.css']
})
export class EurekaComponent implements OnInit {
  startups: PastWinner[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadPastWinners();
  }

  loadPastWinners(): void {
    this.apiService.getPastWinners().subscribe({
      next: (data) => {
        this.startups = data;
        console.log( )
      },
      error: (error) => {
        console.error('Error fetching past winners:', error);

      }
    });
  }
}