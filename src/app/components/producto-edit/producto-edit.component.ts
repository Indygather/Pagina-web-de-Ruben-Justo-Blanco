import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Product } from '../../models/product';
import { Categorie } from '../../models/Categorie';
import { ProductImage } from '../../models/productImage';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-producto-edit',
  templateUrl: './producto-edit.component.html',
  providers: [ProductService],
  styleUrls: ['./producto-edit.component.css']
})
export class ProductoEditComponent implements OnInit {
  loading = true;
  public titulo = "Edición de producto";
  public producto = new Product(0,'','',0,1,'',[]);
  public categorias: Categorie[] = [];
  public productImage: ProductImage = new ProductImage(null,'','0');
  public imagenPrincipal = false;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));

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

  onSubmit(){
    this._productoService.updateProducto(this.producto).subscribe(
      response => {
        if(response.code == 200){
          this.navigateToProductList();
        }else{
          console.log(response);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  addProductImage(){
    if(this.imagenPrincipal){
      this.productImage.IMAGEN_PRINCIPAL = '1';
      if (this.producto.IMAGES && this.producto.IMAGES.length > 0) {
        for (let image of this.producto.IMAGES) {
          image.IMAGEN_PRINCIPAL = '0';
        }
      }
    }
    this.producto.IMAGES.push(this.productImage);
    this.productImage = new ProductImage(null,'','0');
    this.imagenPrincipal = false;
  }

  deleteProductImage(index:number){  
    this.producto.IMAGES.splice(index,1);
    let hayImagenPrincipal = false;
    for (let image of this.producto.IMAGES) {
      if(image.IMAGEN_PRINCIPAL == '1'){
        hayImagenPrincipal = true;
      }
    }
    if(!hayImagenPrincipal && this.producto.IMAGES.length > 0){
      this.producto.IMAGES[0].IMAGEN_PRINCIPAL = '1';
    }
  }

  navigateToProductList(){
    this._router.navigate(['productos'])
  }

}
