import { ProductImage } from './productImage';
export class Product{
	constructor(
		public ID_PRODUCT:number,
		public NAME:string,
		public DESCRIPTION:string,
		public PRICE:number,
		public ID_PRODUCT_CATEGORY:number,
		public URL_IMAGE:string,
		public IMAGES:ProductImage[]
	){}
}