import { Component, OnInit } from '@angular/core';
import { FiltersSectionComponent } from '../filters-section/filters-section.component';
import { ProductosListComponent } from '../productos-list/productos-list.component';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {
public show = true;
  constructor() {
  }

  ngOnInit() {
  }

}
