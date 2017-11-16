import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { Categorie } from '../../models/Categorie';

@Component({
  selector: 'app-producto-detail',
  templateUrl: './producto-detail.component.html',
  providers: [ProductService],
  styleUrls: ['./producto-detail.component.css']
})
export class ProductoDetailComponent implements OnInit {
  loading = true;
  public producto: Product;
  public idProducto: number;
  public categorias: Categorie[] = [];
  constructor(private _route: ActivatedRoute, 
  private _productoService: ProductService,
  private _router: Router) { }

  ngOnInit() {
    this.getDetalleProducto();
    this._productoService.getCategories().subscribe(p => this.categorias = p.data);
  }

  getDetalleProducto(){
    this._route.params.forEach((params: Params) => {
      let id = params['id'];
      if(id != 0){
        this._productoService.getProductDetail(id).subscribe(
          response => {
            this.loading = false;
            if(response.code == 200) {
              this.producto = response.data;
              if(this.producto.IMAGES == null){
                this.producto.IMAGES = [];
              }
            }else{
              this._router.navigate(['product-list']);
            }
          },
          error => {
            console.log(<any>error)
          }
        );
      } else {
        this._router.navigate(['product-list']);
      }
    });
  }

}
