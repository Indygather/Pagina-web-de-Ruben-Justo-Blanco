import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user-productos-list',
  templateUrl: './user-productos-list.component.html',
  styleUrls: ['./user-productos-list.component.css'],
  providers: [ProductService]
})
export class UserProductListComponent implements OnInit {
  public productos: Product[];
  loading = true;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));

  constructor(private _router: Router,
    private _route: ActivatedRoute,
    private _productoService: ProductService) { }

  ngOnInit() {
    this.getUserProductList(this.currentUser.idUser);
  }

  deleteProduct(producto:Product){
    this.loading = true;
    this._productoService.deleteProducto(producto).subscribe(
      result => {
        this.getUserProductList(this.currentUser.idUser);
        this.loading = false;
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  getUserProductList(userId:number){
    this._productoService.getUserProductos(userId).subscribe(
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
