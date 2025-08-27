import { AfterViewInit, Component } from '@angular/core';
import { Nav } from '../../shared/components/nav/nav';
import { Header } from '../../shared/components/header/header';
import feather from 'feather-icons';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Nav, Header],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements AfterViewInit {
  ngAfterViewInit() {
    setTimeout(() => {
      feather.replace();
    });
  }
}
