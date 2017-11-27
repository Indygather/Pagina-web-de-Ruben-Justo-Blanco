import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { Categorie } from '../../models/Categorie';
import { ProductImage } from '../../models/productImage';

@Component({
  selector: 'app-producto-add',
  templateUrl: './producto-add.component.html',
  styleUrls: ['./producto-add.component.css'],
  providers: [ProductService]
})
export class ProductoAddComponent implements OnInit {
  public titulo:string;
  public producto:Product;
  public esPrincipal:boolean;
  public productos: Product[] = [];
  public categorias: Categorie[] = [];
  public productImage: ProductImage = new ProductImage(null,'','0');
  public imagenPrincipal = false;
  public errorMessage;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _productoService: ProductService
  ) {
    this.titulo = 'Crear un nuevo producto';
    this.producto = new Product(null,null,null,null,null,null,[]);
    
   }
  
  ngOnInit() {
    this._productoService.getCategories().subscribe(p => this.categorias = p.data);
  }

  onSubmit(){
    this._productoService.addProduct(this.producto).subscribe(
      response => {
        if(response.code == 200){
          this.productos.push(this.producto);
          this.navigateUserToProductList();
        }else{
          console.log(response);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  addProductImage(){
    if(this.producto.IMAGES.length == 0){
      this.imagenPrincipal = true;
    }
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

  navigateUserToProductList(){
    this._router.navigate(['products/' + this.currentUser.username]);
  }

}
