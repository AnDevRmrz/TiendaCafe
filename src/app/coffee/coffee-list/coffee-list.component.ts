import { Component, OnInit } from '@angular/core';
import { CoffeeService } from '../coffee.service';
import { Coffee } from '../coffee';

@Component({
  selector: 'app-coffee-list',
  templateUrl: './coffee-list.component.html',
  styleUrls: ['./coffee-list.component.css'],
})
export class CoffeeListComponent implements OnInit {
  coffees: Array<Coffee> = [];
  constructor(private coffeeService: CoffeeService) {}

  getCoffees() {
    this.coffeeService.getAllCoffees().subscribe((coffees) => {
      this.coffees = coffees;
    });
  }

  ngOnInit() {
    this.getCoffees();
  }
}
