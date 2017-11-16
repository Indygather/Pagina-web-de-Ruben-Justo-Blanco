import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-productos-list',
  templateUrl: './productos-list.component.html',
  styleUrls: ['./productos-list.component.css'],
  providers: [ProductService]
})
export class ProductosListComponent implements OnInit {
  public productos: Product[];
  loading = true;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));

  constructor(private _productoService: ProductService) { }

  ngOnInit() {
    this.getProductsList();
  }

  getProductsList(){
    this._productoService.getProductos().subscribe(
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
