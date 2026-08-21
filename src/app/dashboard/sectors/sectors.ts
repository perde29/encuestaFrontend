import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import feather from 'feather-icons';

import { Nav } from '../../shared/components/nav/nav';
import { Header } from '../../shared/components/header/header';
import { Form } from './form/form';
import { CategoryService } from '../../core/services/category.service';
import { Category } from '../../core/interfaces/interfaces';
import Swal from 'sweetalert2';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-sectors',
  imports: [Nav, Header, Form] /* RouterLink */,
  templateUrl: './sectors.html',
  styleUrl: './sectors.css',
  standalone: true,
})
export class Sectors implements OnInit, AfterViewInit {
  usuario: string = '';
  sector: Category[] = [];
  selectedId: number = 0;
  showPopup: boolean = false;
  Id: number = 0;

  constructor(
    private readonly router: ActivatedRoute,
    private readonly categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    // icono menu
    setTimeout(() => {
      feather.replace();
    });
    this.usuario = this.router.snapshot.data['usuario'];
    this.getSector();
  }

  getSector() {
    this.categoryService.getSector().subscribe({
      next: (resp) => {
        this.sector = resp;
      },
    });
  }

  onDeleteSectors(id: any) {
    Swal.fire({
      title: '¿Eliminar registro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // deleteCategory
        this.categoryService.deleteCategory(id).subscribe({
          next: () => {
            Swal.fire(
              'Eliminado',
              'El registro fue eliminado correctamente.',
              'success',
            );
            this.getSector();
          },
          error: (err: any) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: err,
            });
          },
        });
      }
    });
  }

  onPopupSectors(id: any) {
    /*alert('Popup de sector con ID: ' + id);*/
    this.showPopup = true;
	  this.selectedId = id;
    this.Id = id;
    const modalElement = document.getElementById('exampleModalToggle');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  ngAfterViewInit() {}
}
