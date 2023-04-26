import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';
import { ModalService } from './detalle/modal.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[]=[];
  paginador: any;
  clienteSeleccionado: Cliente = new Cliente;

  constructor(private clienteService: ClienteService,
    private modalService: ModalService,
    private activatedRoute: ActivatedRoute) { } 

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = Number(params.get('page'));

      if (!page) {
        page = 0;
      }

      this.clienteService.getClientes(page)
        .pipe(
          tap(response => {
            console.log('ClientesComponent: tap 3');
            (response.content as Cliente[]).forEach(cliente => console.log(cliente.nombre));
          })
        ).subscribe(response => {
          this.clientes = response.content as Cliente[];
          this.paginador = response;
        });
    });

    this.modalService.notificarUpload.subscribe(cliente => {
      this.clientes = this.clientes.map(clienteOriginal => {
        if (cliente.id == clienteOriginal.id) {
          clienteOriginal.foto = cliente.foto;
        }
        return clienteOriginal;
      });
    });
  }

  delete(cliente: Cliente): void {
	  Swal.fire({
		  title: 'Está seguro?',
		  text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
	      showCancelButton: true,
	      confirmButtonText: 'Si, eliminar!',
	      cancelButtonText: 'No, cancelar!',
		}).then((result:any) => {
      if (result.value) {
	        this.clienteService.delete(cliente.id).subscribe(
	          () => {
	            this.clientes = this.clientes.filter(cli => cli !== cliente)
	            Swal.fire('Cliente Eliminado!',`Cliente ${cliente.nombre} eliminado con éxito.`,'success');
	          })
	      }
		})
  }
    abrirModal(cliente: Cliente) {
    this.clienteSeleccionado = cliente;
    this.modalService.abrirModal();
  }

}

