import { Region } from "./region";

export class Cliente {
  id: number=0;
  nombre: string='';
  apellido: string='';
  createAt: string='';
  email: string='';
  foto:string='';
  region: Region = new Region;
}
