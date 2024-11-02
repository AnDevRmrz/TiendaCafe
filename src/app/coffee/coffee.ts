export class Coffee {
  id: number;
  nombre: string;
  tipo: string;
  region: string;

  constructor(id: number, nombre: string, tipo: string, region: string) {
    this.id = id;
    this.nombre = nombre;
    this.tipo = tipo;
    this.region = region;
  }
}
