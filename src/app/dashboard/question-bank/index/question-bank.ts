import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Nav } from '../../../shared/components/nav/nav';
import { Header } from '../../../shared/components/header/header';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Questionary } from '../../../core/interfaces/interfaces';
import { QuestionaryService } from '../../../core/services/questionary.service';
import feather from 'feather-icons';
import { PageRoutingModule } from '../../../page/page-routing-module';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-question-bank',
  standalone: true,
  imports: [Nav, Header, RouterLink, PageRoutingModule],
  templateUrl: './question-bank.html',
  styleUrl: './question-bank.css',
})
export class QuestionBank implements OnInit {
  usuario: string = '';
  questionary: Questionary[] = [];
  questionaryCan: number[] = [];

  constructor(
    private readonly router: ActivatedRoute,
    private readonly questionaryService: QuestionaryService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    // icono menu
    setTimeout(() => {
      feather.replace();
    });

    this.usuario = this.router.snapshot.data['usuario'];
    this.cargarDatos();
  }

  cargarDatos() {
    this.questionaryService.getQuestionary().subscribe((resp) => {
      this.questionary = resp;
      this.questionaryCan = Array.from(
        { length: resp.length },
        (_, i) => i + 1,
      ); // resp.length;
    });
  }

  orderRegistration(event: Event) {
    // alert('Ordenando');
    const selectElement = event.target as HTMLSelectElement;
    const id = Number(selectElement.id);
    const value = Number(selectElement.value);
    this.questionaryService
      .getQuestionayOrder({ id, value })
      .subscribe((res) => {
        console.log(res);
      });

    window.location.reload();
  }

  onDeleteQuestion(id: any) {
    /* alert('¿Desea eliminar esta pregunta?'); */
    Swal.fire({
      title: '¿Eliminar registro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí puedes implementar la lógica para eliminar la alternativa
        this.questionaryService.deleteQuestionary(id).subscribe({
          next: () => {
            Swal.fire(
              'Eliminado',
              'El registro fue eliminado correctamente.',
              'success',
            );
            this.cargarDatos();
          },
          error: (err: any) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: err?.error?.message ?? err?.error?.message,
            });
          },
        });
      }
    });
  }
}
