export class User{
	constructor(
        public idUser:number,
        public name:string,
        public lastName:string,
        public email:string,
		public userName:string,
        public password:string,
        public confirmPassword:string
	){}
}