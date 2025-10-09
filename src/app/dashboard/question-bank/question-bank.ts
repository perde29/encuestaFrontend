import { Component, OnInit } from '@angular/core';
import { Nav } from '../../shared/components/nav/nav';
import { Header } from '../../shared/components/header/header';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question-bank',
  standalone: true,
  imports: [Nav, Header],
  templateUrl: './question-bank.html',
  styleUrl: './question-bank.css'
})
export class QuestionBank implements OnInit {
  usuario: string = '';

  constructor(private readonly router: ActivatedRoute){}

  ngOnInit(): void {
    this.usuario = this.router.snapshot.data['usuario'];
  }

}
