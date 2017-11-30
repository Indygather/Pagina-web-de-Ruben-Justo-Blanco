import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { Filters } from '../../models/Filters';
import { AuthenticationService } from '../../auth/authentication.service';

@Component({
  selector: 'app-productos-list',
  templateUrl: './productos-list.component.html',
  styleUrls: ['./productos-list.component.css']
})
export class ProductosListComponent implements OnInit {
  public productos: Product[];
  public userFilters: Filters;
  loading = true;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));

  constructor(private _productoService: ProductService,
    private authenticationService: AuthenticationService) {
    }

  ngOnInit() {
    this.getProductsList();
  }

  getProductsList(){
    this._productoService.getProducts().subscribe(
      result => {
        this.loading = false;
        this.productos = result.data;
      },
      error => {
        console.log(<any>error);
      }
    );
  }
}
