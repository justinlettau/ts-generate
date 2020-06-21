export class HomeWorld {
  constructor(name: string) {
    this.name = name;
  }

  readonly name: string;
  population: number | null;
  climate: string | null;
}
