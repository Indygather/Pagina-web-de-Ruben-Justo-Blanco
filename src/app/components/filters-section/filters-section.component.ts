import { Component, OnInit } from '@angular/core';
import { Filters } from '../../models/Filters';
import { Categorie } from '../../models/Categorie';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-filters-section',
  templateUrl: './filters-section.component.html',
  styleUrls: ['./filters-section.component.css'],
  providers: [ProductService]
})
export class FiltersSectionComponent implements OnInit {
  public categorias: Categorie[] = [];
  public userFilters: Filters;
  
  constructor(private _productoService: ProductService) { 
    this._productoService.getCategories().subscribe(p => this.categorias = p.data);
    this.userFilters = JSON.parse(localStorage.getItem('userFilters'));
    if(!this.userFilters){
      this.userFilters = new Filters('','','',0,0,null);
    }
  }

  ngOnInit() {
    localStorage.setItem('userFilters', JSON.stringify(this.userFilters));
  }

  onSubmit(){

  }

}
