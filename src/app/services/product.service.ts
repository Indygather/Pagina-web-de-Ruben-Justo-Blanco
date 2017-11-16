import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
 
import { AuthenticationService } from '../auth/authentication.service';
import { Product } from '../models/product';
 
@Injectable()
export class ProductService {

    url = 'http://rubenjustoblanco.com/martket-backend/v1/index.php/';
    //url = 'http://localhost/martket-backend/v1/index.php/';

    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {
    }
 
    getProductos() {
        return this.http.get(this.url+'products')
            .map((response: Response) => response.json());
    }
    getCategories() {
        return this.http.get(this.url+'categories')
            .map((response: Response) => response.json());
    }
    getUserProductos(userId:number) {
        return this.http.get(this.url+'user-products/'+userId)
            .map((response: Response) => response.json());
    }

    getProductDetail(id:number) {
        // add authorization header with jwt token
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let headers = new Headers({ 
            'User': currentUser.username,
            'Authorization': currentUser.token 
        });
        let options = new RequestOptions({ headers: headers });
 
        return this.http.get(this.url+'product'+'/'+id, options)
            .map((response: Response) => response.json());
    }

    addProducto(producto: Product) {
        // add authorization header with jwt token
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));

        let json = JSON.stringify(producto);
        let params = 'json='+json;
        let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded',
        'User': currentUser.username,
        'Authorization': currentUser.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.url+'producto',params, options)
            .map(res => res.json());
    }

    updateProducto(producto: Product) {
        // add authorization header with jwt token
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        let json = JSON.stringify(producto);
        let params = 'json='+json;
        let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded',
        'User': currentUser.username,
        'Authorization': currentUser.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.url+'update-product'+'/'+producto.ID_PRODUCT,params, options)
            .map(res => res.json());
    }

    deleteProducto(producto: Product){
        // add authorization header with jwt token
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));

        let json = JSON.stringify(producto);
        let params = 'json='+json;
        let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded',
        'User': currentUser.username,
        'Authorization': currentUser.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.url+'delete-product',params,options)
            .map(res => res.json());
    }
}