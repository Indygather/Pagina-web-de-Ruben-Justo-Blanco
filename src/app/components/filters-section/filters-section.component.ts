import { Component, Output, EventEmitter } from '@angular/core';
import { Filters } from '../../models/Filters';
import { Categorie } from '../../models/Categorie';
import { ProductService } from '../../services/product.service';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-filters-section',
  templateUrl: './filters-section.component.html',
  styleUrls: ['./filters-section.component.css']
})
export class FiltersSectionComponent {
  @Output() cleanFiltersEvent = new EventEmitter();
  public categorias: Categorie[] = [];
  public userFilters: Filters;
  
  constructor(private _productoService: ProductService,
    private http: Http) {
    this._productoService.getCategories().subscribe(p => 
      {
        this.categorias = p.data;
        this.categorias.splice(0,0,new Categorie(0,'TODAS','TODAS'));
      });
    this.userFilters = JSON.parse(localStorage.getItem('userFilters'));
    if(!this.userFilters){
      this.userFilters = new Filters('','',null,null,null);
    }
  }

  setFilters(){
    localStorage.setItem('userFilters', JSON.stringify(this.userFilters));
  }

  limpiarFiltros(){
    this.userFilters = new Filters('','',null,null,null);
    localStorage.setItem('userFilters', JSON.stringify(this.userFilters));
    this.cleanFiltersEvent.emit(null);
  }

}
