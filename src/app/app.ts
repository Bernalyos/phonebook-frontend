import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Contacto } from './models/contacto.model';
import { ContactoService } from './services/contacto.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  contactos: Contacto[] = [];
  contactosFiltrados: Contacto[] = [];

  filtroPersona = true;
  filtroOrgPublica = true;
  filtroOrgPrivada = true;

  contactoActual: Partial<Contacto> = {
    tipoDeContacto: 'Persona',
    nombre: '',
    telefono: '',
    comentarios: '',
    camposAdicionales: ''
  };

  esEdicion = false;
  idContactoAEliminar: number | null = null;

  constructor(
    private contactoService: ContactoService,
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarContactos();
  }

cargarContactos(): void {
    this.contactoService.getContactos().subscribe({
      next: (data: Contacto[]) => {
        // Usamos setTimeout para darle 1 milisegundo a Angular para respirar.
        // Esto elimina por completo el error rojo NG0100 de la consola.
        setTimeout(() => {
          this.contactos = data;
          this.aplicarFiltros();
          this.cdr.detectChanges(); // Fuerza a la tabla a dibujarse al instante
        }, 0);
      },
      error: (err: any) => console.error('Error al cargar contactos', err)
    });
  }
  aplicarFiltros(): void {
    this.contactosFiltrados = this.contactos.filter((c: Contacto) => {
      if (c.tipoDeContacto === 'Persona' && this.filtroPersona) return true;
      if (c.tipoDeContacto === 'Organización Pública' && this.filtroOrgPublica) return true;
      if (c.tipoDeContacto === 'Organización Privada' && this.filtroOrgPrivada) return true;
      return false;
    });
  }

  abrirModalContacto(content: TemplateRef<unknown>, contacto?: Contacto): void {
    if (contacto) {
      this.esEdicion = true;
      this.contactoActual = { ...contacto };
    } else {
      this.esEdicion = false;
      this.contactoActual = {
        tipoDeContacto: 'Persona',
        nombre: '',
        telefono: '',
        comentarios: '',
        camposAdicionales: ''
      };
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' });
  }

  guardarContacto(modal: any): void {
    if (this.esEdicion && this.contactoActual.id) {
      this.contactoService.actualizarContacto(this.contactoActual.id, this.contactoActual as Contacto).subscribe({
        next: () => {
          alert('¡Se ha actualizado correctamente!');
          this.cargarContactos(); // 1. Refresca los datos en la tabla
          modal.close();          // 2. Cierra la ventana
        },
        error: (err: any) => {
          console.error('Error al actualizar', err);
          alert('Hubo un error al actualizar el contacto.');
        }
      });
    } else {
      this.contactoService.crearContacto(this.contactoActual as Omit<Contacto, 'id'>).subscribe({
        next: () => {
          alert('¡Se ha guardado correctamente!');
          this.cargarContactos(); // 1. Refresca los datos en la tabla
          modal.close();          // 2. Cierra la ventana
        },
        error: (err: any) => {
          console.error('Error al crear', err);
          alert('Hubo un error al guardar el contacto.');
        }
      });
    }
  }

  abrirModalEliminar(content: TemplateRef<unknown>, id: number): void {
    this.idContactoAEliminar = id;
    this.modalService.open(content);
  }

  confirmarEliminacion(modal: any): void {
    if (this.idContactoAEliminar !== null) {
      this.contactoService.eliminarContacto(this.idContactoAEliminar).subscribe({
        next: () => {
          alert('¡Se ha eliminado correctamente!');
          this.cargarContactos();
          modal.close();
        },
        error: (err: any) => {
          console.error('Error al eliminar', err);
          alert('Hubo un error al eliminar el contacto.');
        }
      });
    }
  }
}