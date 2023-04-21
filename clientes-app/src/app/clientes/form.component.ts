import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Region } from './region';

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

	cliente: Cliente = new Cliente();
	titulo: string = "Crear Cliente";

	errores: string[] = [];
	regiones: Region[] = [];

	constructor(private clienteService: ClienteService,
		private router: Router,
		private activatedRoute: ActivatedRoute) { }

	ngOnInit() {
		this.activatedRoute.paramMap.subscribe((params: any) => {
			let id = +params.get('id');
			if (id) {
				this.clienteService.getCliente(id).subscribe((cliente: Cliente) => this.cliente = cliente);
			}
		});
		this.clienteService.getRegiones().subscribe(regiones => {
			this.regiones = regiones;
		});
	}

	create(): void {

		console.log(this.cliente);
		this.clienteService.create(this.cliente)
			.subscribe(
				cliente => {
					this.router.navigate(['/clientes']);
					swal.fire('Nuevo cliente', `El cliente ${cliente.nombre} ha sido creado con éxito`, 'success');
				},
				err => {
					this.errores = err.error.errors as string[];
					console.error('Código del error desde el backend: ' + err.status);
					console.error(err.error.errors);
				}
			);
	}

	update(): void {
		console.log(this.cliente);
		this.clienteService.update(this.cliente)
			.subscribe(
				json => {
					this.router.navigate(['/clientes']);
					swal.fire('Cliente Actualizado', `${json.mensaje}: ${json.cliente.nombre}`, 'success');
				},
				err => {
					this.errores = err.error.errors as string[];
					console.error('Código del error desde el backend: ' + err.status);
					console.error(err.error.errors);
				}
			)
	}

	compararRegion(o1: Region, o2: Region): boolean {
		if(o1===undefined && o2 ===undefined){return true;}
		return o1 == null || o2 == null ? false : o1.id == o2.id;
	}

}
