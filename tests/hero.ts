import { HomeWorld } from './home-world';
import { Person } from './person';
import { StarShip } from './star-ship';

export class Hero extends Person {
  firstName: string;
  lastName: string;
  get name() {
    return `${this.firstName} ${this.lastName}`;
  }
  gender?: string;
  height: number;
  mass: number | null;
  homeWorld: HomeWorld;
  vehicles: StarShip[];
}
