import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScrollToTopService } from './services/scroll-to-top.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'emn';
  
  constructor(private scrollToTopService: ScrollToTopService) {}
  
  ngOnInit() {
    this.scrollToTopService.setupScrollToTop();
  }
}
