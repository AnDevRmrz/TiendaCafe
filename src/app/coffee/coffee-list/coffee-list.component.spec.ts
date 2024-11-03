/* tslint:disable:no-unused-variable */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { faker } from '@faker-js/faker';

import { CoffeeListComponent } from './coffee-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CoffeeService } from '../coffee.service';
import { Coffee } from '../coffee';

describe('CoffeeListComponent', () => {
  let component: CoffeeListComponent;
  let fixture: ComponentFixture<CoffeeListComponent>;
  let debug: DebugElement;
  let regions = ['Blend', 'Origen'];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [CoffeeListComponent],
      providers: [CoffeeService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeListComponent);
    component = fixture.componentInstance;

    for (let i = 0; i < 3; i++) {
      const coffee = new Coffee(
        faker.number.int(),
        faker.word.noun(),
        regions[faker.number.int({ min: 0, max: 1 })],
        faker.lorem.sentence()
      );
      component.coffees.push(coffee);
    }

    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a p element with the text El aroma mágico', () => {
    const element: HTMLElement = debug.query(By.css('p.title')).nativeElement;
    expect(element.textContent).toEqual('El aroma mágico');
  });

  it('should have 4 th headers elements', () => {
    const elements = debug.queryAll(By.css('thead.table-dark tr th'));
    expect(elements).toHaveSize(4);
  });

  it('should have th headers with their corresponding text', () => {
    const elements = debug.queryAll(By.css('thead.table-dark tr th'));
    elements.forEach((th, i) => {
      let expectedText = '';
      switch (i) {
        case 0:
          expectedText = '#';
          break;
        case 1:
          expectedText = 'Nombre';
          break;
        case 2:
          expectedText = 'Tipo';
          break;
        case 3:
          expectedText = 'Región';
          break;
      }
      expect(th.nativeElement.textContent).toEqual(expectedText);
    });
  });

  it('should have 3 tr rows elements', () => {
    const elements = debug.queryAll(By.css('tbody tr'));
    expect(elements).toHaveSize(3);
  });

  it('should have th/td elements with the expected coffee id, name, type and region values', () => {
    const elements = debug.queryAll(By.css('tbody tr'));
    expect(elements).toHaveSize(3);
    elements.forEach((t, i) => {
      expect(t.children.length).toEqual(4);
      expect(t.children[0].nativeElement.textContent).toEqual(
        component.coffees[i].id.toString()
      );
      expect(t.children[1].nativeElement.textContent).toEqual(
        component.coffees[i].nombre
      );
      expect(t.children[2].nativeElement.textContent).toEqual(
        component.coffees[i].tipo
      );
      expect(t.children[3].nativeElement.textContent).toEqual(
        component.coffees[i].region
      );
    });
  });

  it('should have two p elements with the consolidated amounts', () => {
    const elements = debug.queryAll(
      By.css('div#consolidated-info-container p')
    );
    let originCoffees = 0;
    let blendCoffees = 0;
    component.coffees.forEach((c) => {
      if (c.tipo == regions[0]) {
        blendCoffees++;
      } else {
        originCoffees++;
      }
    });
    expect(elements).toHaveSize(2);
    expect(elements[0].nativeElement.textContent).toEqual(
      'Total café de origen: ' + originCoffees
    );
    expect(elements[1].nativeElement.textContent).toEqual(
      'Total café blend: ' + blendCoffees
    );
  });
});
