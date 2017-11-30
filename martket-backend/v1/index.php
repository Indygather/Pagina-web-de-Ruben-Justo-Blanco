<?php

require_once '../vendor/autoload.php';

$app = new \Slim\Slim();

$db = new mysqli('mysql.hostinger.com', 'u494887037_mrtkt', '32703802Xx', 'u494887037_mrtkt');

// Configuración de cabeceras
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, User, Authorization, Filters, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER['REQUEST_METHOD'];
if($method == "OPTIONS") {
	die();
}

// Para probar si el servidor esta ON
$app->get("/pruebas", function() use($app){
	echo "Hola mundo desde Slim PHP";
});

// Funcion middelware de PHP para autenticar aquellas llamadas a recursos de API privados
function authenticate(\Slim\Route $route) {
	// Getting request headers
	$headers = apache_request_headers();
	$app = \Slim\Slim::getInstance();
	$db = new mysqli('mysql.hostinger.com', 'u494887037_mrtkt', '32703802Xx', 'u494887037_mrtkt');

	// Verifying Authorization Header
	if (isset($headers['Authorization']) && isset($headers['User'])) {
		
		// get the user
		$user = $headers['User'];
		// get the api key
		$token = $headers['Authorization'];
		//autenticacion contra base de datos		 
		$sql = 'SELECT * FROM USERS WHERE USER_NAME = \''.$user.'\'';
		$query = $db->query($sql);
		$userReg = $query->fetch_assoc();
		if($userReg['PASSWORD'] == $token){
			// Si se autentica correctamente la ejecucion sigue adelante
		} else {
			$result = array(
				'status' 	=> 'error',
				'code'		=> 401,
				'message' 	=> 'User or authentication token invalid.',
			);
			echo json_encode($result);
			$app->stop();
		}
	} else {
		// api key is missing in header
		$result = array(
			'status' 	=> 'error',
			'code'		=> 401,
			'message' 	=> 'Missing user or authentication token.',
		);
		echo json_encode($result);
		mysqli_close($db);
		$app->stop();
	}
}

// Para gestionar el login de la aplicacion, si se autentica con exito se devuelve el token de autenticacion del usuario
$app->get('/login', function() use($app, $db){
	$headers = apache_request_headers();
	$user = $headers['User'];
	$pass = $headers['Authorization'];
	$sql = 'SELECT * FROM USERS WHERE USER_NAME = \''.$user.'\'';
	$query = $db->query($sql);

	$result = array(
		'status' => 'error',
		'code'	 => 401,
		'message' => 'Invalid user or password.'
	);

	if($query->num_rows == 1){

		$userReg = $query->fetch_assoc();

		// Desencriptado
		$key = pack('H*', "79796e3967793274496e6e48624a6252556f6b556d4a5564583766544f6a394d");

	    # crear una aleatoria IV para utilizarla co condificación CBC
		$iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC);
		$iv = mcrypt_create_iv($iv_size, MCRYPT_RAND);

		$ciphertext_dec = base64_decode($userReg['PASSWORD']);

	    # recupera la IV, iv_size debería crearse usando mcrypt_get_iv_size()
		$iv_dec = substr($ciphertext_dec, 0, $iv_size);

	    # recupera el texto cifrado (todo excepto el $iv_size en el frente)
		$ciphertext_dec = substr($ciphertext_dec, $iv_size);

	    # podrían eliminarse los caracteres con valor 00h del final del texto puro
		$plaintext_dec = mcrypt_decrypt(MCRYPT_RIJNDAEL_128, $key,
			$ciphertext_dec, MCRYPT_MODE_CBC, $iv_dec);

		$plaintext_dec = trim($plaintext_dec);

		
		if($plaintext_dec == $pass){
			$result = array(
				'status' 	=> 'success',
				'code'		=> 200,
				'message' 	=> 'Succesfully authenticated.',
				'token'		=> $userReg['PASSWORD'],
				'idUser'	=> $userReg['ID_USER']
			);
		}
	}
	echo json_encode($result);
	mysqli_close($db);
});

// Registro de nuevo usuario
$app->post('/register', function() use($app, $db){
	$json = $app->request->post('json');
	$data = json_decode($json, true);

	$message = 'Error creating the user account:';
	$error = false;
	
	$result = array(
		'status' 	=> 'error',
		'code'		=> 400,
		'message' 	=> $message
	);

	// Comprobacion de que se facilitan todos los datos del producto para su alta
	if(!isset($data['name'])){
		$message = $message.' User name required.';
		$error = true;
	}

	if(!isset($data['lastName'])){
		$message = $message.' User last name required.';
		$error = true;
	}

	if(!isset($data['email'])){
		$message = $message.' User email required.';
		$error = true;
	}
	
	if(!isset($data['userName'])){
		$message = $message.' Account name required.';
		$error = true;
	}
	
	if(!isset($data['password'])){
		$message = $message.' Account password required.';
		$error = true;
	}
	// Si falta algun campo se devuelve el error con los campos que faltan por cubrir
	if($error){
		$result['message'] = $message;
		echo json_encode($result);
		mysqli_close($db);
		$app->stop();
	}

	$sql = 'SELECT * FROM USERS WHERE EMAIL = \''.$data['email'].'\';';
	$query = $db->query($sql);
	if($query->num_rows >= 1){
		$result['message'] = 'User email alredy used in another account.';
		echo json_encode($result);
		mysqli_close($db);
		$app->stop();
	}

	$sql = 'SELECT * FROM USERS WHERE USER_NAME = \''.$data['userName'].'\';';
	$query = $db->query($sql);
	if($query->num_rows >= 1){
		$result['message'] = 'User name alredy used in another account.';
		echo json_encode($result);
		mysqli_close($db);
		$app->stop();
	}

	$users = array();
	while ($user = $query->fetch_assoc()) {
		$users[] = $user;
	}
	
	// Encriptacion de la password
	$key = pack('H*', "79796e3967793274496e6e48624a6252556f6b556d4a5564583766544f6a394d");
	$iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC);
	$iv = mcrypt_create_iv($iv_size, MCRYPT_RAND);

    # crea un texto cifrado compatible con AES (tamaño de bloque Rijndael = 128)
    # para hacer el texto confidencial 
    # solamente disponible para entradas codificadas que nunca finalizan con el
    # el valor  00h (debido al relleno con ceros)
	$ciphertext = mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $key,
		$data['password'], MCRYPT_MODE_CBC, $iv);

    # anteponer la IV para que esté disponible para el descifrado
	$ciphertext = $iv . $ciphertext;

    # codificar el texto cifrado resultante para que pueda ser representado por un string
	$encrypted_password = base64_encode($ciphertext);

	// Si todo va bien se inserta el nuevo producto del usuario
	$query = "INSERT INTO USERS (`ID_USER`, `NAME`, `LAST_NAME`, `EMAIL`, `USER_NAME`, `PASSWORD`,`ENABLE`)".
	"VALUES(NULL,".
	"'{$data['name']}',".
	"'{$data['lastName']}',".
	"'{$data['email']}',".
	"'{$data['userName']}',".
	"'{$encrypted_password}',".
	"true".
	");";

	$db->query($query);

	$id = $db->insert_id;

	$result = array(
		'status' => 'error',
		'code'	 => 500,
		'message' => 'Server error creating the account. Try again later.'
	);

	if($id > 0){
		$result = array(
			'status' => 'success',
			'code'	 => 200,
			'message' => 'Account created successfully.'
		);
	}

	echo json_encode($result);
});

// LISTAR TODOS LOS USUARIOS -- Permitir solo para el rol de usuario ADMIN
$app->get('/users', 'authenticate', function() use($db, $app){
	$sql = 'SELECT * FROM USERS ORDER BY ID_USER DESC;';
	$query = $db->query($sql);

	$users = array();
	while ($user = $query->fetch_assoc()) {
		$users[] = $user;
	}

	$result = array(
		'status' => 'success',
		'code'	 => 200,
		'data' => $users
	);

	echo json_encode($result);
	mysqli_close($db);
});

// DEVOLVER TODAS LAS CATEGORIAS DE PRODUCTOS
$app->get('/categories', function() use($db, $app){
	$sql = 'SELECT * FROM PRODUCT_CATEGORIES ORDER BY NAME ASC;';
	$query = $db->query($sql);

	$categorias = array();
	while ($categoria = $query->fetch_assoc()) {
		$categorias[] = $categoria;
	}
	
	$result = array(
		'status' => 'success',
		'code'	 => 200,
		'data' => $categorias
	);

	echo json_encode($result);
	mysqli_close($db);
});

// LISTAR LOS PRODUCTOS FILTRADOS CON SU IMAGEN PRINCIPAL (SI LA TIENEN)
$app->get('/products', function() use($db, $app){
	// En primer lugar se obtienen los filtros de la cabecera http
	$headers = apache_request_headers();
	$headerFilters = $headers['Filters'];
	$jsonFilters = json_decode($headerFilters, true);
	// Se construlle el where en base a los filtros establecidos
	$whereSection = 'WHERE';
	$hasFilters = false;
	if(isset($jsonFilters['BUSCAR']) && $jsonFilters['BUSCAR'] !== ''){
		if($hasFilters){
			$whereSection = $whereSection.' AND ';
		} else {
			$hasFilters = true;
		}
		$whereSection = $whereSection.' NAME like \'%'.$jsonFilters['BUSCAR'].'%\' OR DESCRIPTION like \'%'.$jsonFilters['BUSCAR'].'%\'';
	}
	
	if(isset($jsonFilters['PRICE_MIN'])){
		if($hasFilters){
			$whereSection = $whereSection.' AND ';
		} else {
			$hasFilters = true;
		}
		$whereSection = $whereSection.' PRICE >= '.$jsonFilters['PRICE_MIN'];
	}
	
	if(isset($jsonFilters['PRICE_MAX'])){
		if($hasFilters){
			$whereSection = $whereSection.' AND ';
		} else {
			$hasFilters = true;
		}
		$whereSection = $whereSection.' PRICE <= '.$jsonFilters['PRICE_MAX'];
	}
	
	if(isset($jsonFilters['ID_PRODUCT_CATEGORY']) && $jsonFilters['ID_PRODUCT_CATEGORY'] > 0){
		if($hasFilters){
			$whereSection = $whereSection.' AND ';
		} else {
			$hasFilters = true;
		}
		$whereSection = $whereSection.' ID_PRODUCT_CATEGORY = '.$jsonFilters['ID_PRODUCT_CATEGORY'];
	}
	$sql = 'SELECT `PRODUCTS`.`ID_PRODUCT`, `ID_USER`, `NAME`, `DESCRIPTION`, `PRICE`, `PRODUCTS`.`CREATION_DATE`, `PRODUCTS`.`UPDATE_DATE`, `PRODUCTS`.`ENABLE`, `ID_PRODUCT_CATEGORY`, `ID_IMAGE`,`URL_IMAGE`,`URL_IMAGE` FROM PRODUCTS LEFT JOIN PRODUCT_IMAGES ON PRODUCTS.ID_PRODUCT=PRODUCT_IMAGES.ID_PRODUCT AND (PRODUCT_IMAGES.IMAGEN_PRINCIPAL=1 OR PRODUCT_IMAGES.ID_PRODUCT = null) ';
	if($hasFilters){
		$sql = $sql.$whereSection;
	}
	$sql = $sql.' ORDER BY PRODUCTS.ID_PRODUCT DESC;';
	$query = $db->query($sql);

	$productos = array();
	while ($producto = $query->fetch_assoc()) {
		$productos[] = $producto;
	}
	
	$result = array(
		'status' => 'success',
		'code'	 => 200,
		'data' => $productos
	);

	echo json_encode($result);
	mysqli_close($db);
});

// LISTAR TODOS LOS PRODUCTOS DE UN VENDEDOR
$app->get('/products/:userId', function($id) use($db, $app){
	$sql = 'SELECT * FROM PRODUCTS WHERE ID_USER = '.$id .' ORDER BY ID_PRODUCT DESC;';
	$query = $db->query($sql);

	$productos = array();
	while ($producto = $query->fetch_assoc()) {
		$productos[] = $producto;
	}
	
	$result = array(
		'status' => 'success',
		'code'	 => 200,
		'data' => $productos
	);

	echo json_encode($result);
	mysqli_close($db);
});

// LISTAR TODOS LOS PRODUCTOS DE UN USUARIO CON SU IMAGEN PRINCIPAL (SI LA TIENEN)
$app->get('/user-products/:userId', function($id) use($db, $app){
	$sql = 'SELECT `PRODUCTS`.`ID_PRODUCT`, `ID_USER`, `NAME`, `DESCRIPTION`, `PRICE`, `PRODUCTS`.`CREATION_DATE`, `PRODUCTS`.`UPDATE_DATE`, `PRODUCTS`.`ENABLE`, `ID_PRODUCT_CATEGORY`, `ID_IMAGE`,`URL_IMAGE`,`URL_IMAGE` FROM PRODUCTS LEFT JOIN PRODUCT_IMAGES ON PRODUCTS.ID_PRODUCT=PRODUCT_IMAGES.ID_PRODUCT AND (PRODUCT_IMAGES.IMAGEN_PRINCIPAL=1 OR PRODUCT_IMAGES.ID_PRODUCT = null) WHERE PRODUCTS.ID_USER = '.$id.' ORDER BY PRODUCTS.ID_PRODUCT DESC;';
	$query = $db->query($sql);

	$productos = array();
	while ($producto = $query->fetch_assoc()) {
		$productos[] = $producto;
	}
	
	$result = array(
		'status' => 'success',
		'code'	 => 200,
		'data' => $productos
	);

	echo json_encode($result);
	mysqli_close($db);
});

// DEVOLVER UN SOLO PRODUCTO POR ID
$app->get('/product/:productId', function($id) use($db, $app){
	$sql = 'SELECT `PRODUCTS`.`ID_PRODUCT`, `ID_USER`, `NAME`, `DESCRIPTION`, `PRICE`, `PRODUCTS`.`CREATION_DATE`, `PRODUCTS`.`UPDATE_DATE`, `PRODUCTS`.`ENABLE`, `ID_PRODUCT_CATEGORY`, `ID_IMAGE`,`URL_IMAGE`,`URL_IMAGE`,`IMAGEN_PRINCIPAL` FROM PRODUCTS LEFT JOIN PRODUCT_IMAGES ON PRODUCTS.ID_PRODUCT=PRODUCT_IMAGES.ID_PRODUCT WHERE PRODUCTS.ID_PRODUCT = '.$id.' ORDER BY PRODUCTS.ID_PRODUCT DESC;';

	$query = $db->query($sql);

	$result = array(
		'status' 	=> 'error',
		'code'		=> 404,
		'message' 	=> 'Product no found.'
	);
	if($query->num_rows >= 1){
		$images = array();
		$firstIteration = true;
		$idProduct = null;
		$name = null;
		$description = null;
		$price = null;
		$idProductCategory = null;
		$images = null;
		while ($producto = $query->fetch_assoc()) {
			// En la primera iteracion recogemos todos los datos del producto y la primera imagen, en las siguientes solo los datos de las imagenes
			if($firstIteration){
				$idProduct = $producto['ID_PRODUCT'];
				$name = $producto['NAME'];
				$description = $producto['DESCRIPTION'];
				$price = $producto['PRICE'];
				$idProductCategory = $producto['ID_PRODUCT_CATEGORY'];
				$firstIteration = false;
			}
			if($producto['ID_IMAGE']){
				$images[] = array(
					'ID_IMAGE'	 		=> $producto['ID_IMAGE'],
					'URL_IMAGE'			=> $producto['URL_IMAGE'],
					'IMAGEN_PRINCIPAL'	=> $producto['IMAGEN_PRINCIPAL']
				);
			}
			
		}
		$producto = array(
			'ID_PRODUCT' => $idProduct,
			'NAME' => $name,
			'DESCRIPTION' => $description,
			'PRICE' => $price,
			'ID_PRODUCT_CATEGORY' => $idProductCategory,
			'IMAGES' => $images,
		);
		$result = array(
			'status' 	=> 'success',
			'code'		=> 200,
			'data' 	=> $producto
		);
	} else {
		$result = array(
			'status' 	=> 'error',
			'code'		=> 500,
			'data' 	=> 'No product found with id: '.$id
		);	
	}
	

	echo json_encode($result);
});

// ELIMINAR UN PRODUCTO --- Permitir solo al vendedor del producto eliminar dicho producto
$app->post('/delete-product','authenticate', function() use($db, $app){
	$json = $app->request->post('json');
	$data = json_decode($json, true);

	$headers = apache_request_headers();
	$user = $headers['User'];
	
	// Se obtienen los datos del usuario
	$sql = 'SELECT * FROM USERS WHERE USER_NAME = \''.$user.'\'';
	$query = $db->query($sql);
	$userReg = $query->fetch_assoc();
	
	// Se obtienen los datos del producto
	$sql = 'SELECT * FROM PRODUCTS WHERE ID_PRODUCT = '.$data['ID_PRODUCT'].';';
	$query = $db->query($sql);

	$producto = null;
	if($query->num_rows == 1){
		$producto = $query->fetch_assoc();
	} else {
		$result = array(
			'status' 	=> 'error',
			'code'		=> 404,
			'message' 	=> 'Product not found.'
		);
		echo json_encode($result);
		mysqli_close($db);
		$app->stop();
	}
	
	// Se comprueba si el producto pertenece al usuario, de lo contrario se devuelve un error
	if($producto['ID_USER'] != $userReg['ID_USER']){
		$result = array(
			'status' 	=> 'error',
			'code'		=> 401,
			'message' 	=> 'The user is not the owner of the product.'
		);
		echo json_encode($result);
		mysqli_close($db);
		$app->stop();
	} 
	
	// Si se pasan las validaciones se elimina el producto
	$sql = 'DELETE FROM PRODUCTS WHERE ID_PRODUCT = '.$data['ID_PRODUCT'];
	$query = $db->query($sql);

	if($query){
		$result = array(
			'status' 	=> 'success',
			'code'		=> 200,
			'message' 	=> 'Product deleted successfully.'
		);
	}else{
		$result = array(
			'status' 	=> 'error',
			'code'		=> 500,
			'message' 	=> 'Error deleting product, try again later.'
		);
	}

	echo json_encode($result);
});

// GUARDAR PRODUCTOS
$app->post('/producto','authenticate', function() use($app, $db){
	$json = $app->request->post('json');
	$data = json_decode($json, true);
	
	$headers = apache_request_headers();
	$user = $headers['User'];
	
	// Se obtienen los datos del usuario para asignarle al producto los datos del usuario
	$sql = 'SELECT * FROM USERS WHERE USER_NAME = \''.$user.'\'';
	$query = $db->query($sql);
	$userReg = $query->fetch_assoc();
	$message = 'Error creating the product:';
	$error = false;
	
	$result = array(
		'status' 	=> 'error',
		'code'		=> 400,
		'message' 	=> $message
	);

	// Comprobacion de que se facilitan todos los datos del producto para su alta
	if(!isset($data['NAME'])){
		$message = $message.' Name of the product required.';
		$error = true;
	}

	if(!isset($data['DESCRIPTION'])){
		$message = $message.' Description of the product required.';
		$error = true;
	}

	if(!isset($data['PRICE'])){
		$message = $message.' Price of the product required.';
		$error = true;
	}
	
	if(!isset($data['ID_PRODUCT_CATEGORY'])){
		$message = $message.' Category of the product required.';
		$error = true;
	}
	// Si falta algun campo se devuelve el error con los campos que faltan por cubrir
	if($error){
		$result['message'] = $message;
		echo json_encode($result);
		mysqli_close($db);
		$app->stop();
	}
	// Si todo va bien se inserta el nuevo producto del usuario
	$query = "INSERT INTO PRODUCTS (`ID_PRODUCT`, `ID_USER`, `NAME`, `DESCRIPTION`, `PRICE`, `ENABLE`, `ID_PRODUCT_CATEGORY`) ".
	"VALUES(NULL,".
	"{$userReg['ID_USER']},".
	"'{$data['NAME']}',".
	"'{$data['DESCRIPTION']}',".
	"{$data['PRICE']},".
	"true,".
	"{$data['ID_PRODUCT_CATEGORY']}".
	");";

	$db->query($query);

	$idProducto = $db->insert_id;

	if($idProducto == 0){
		$result = array(
			'status' => 'error',
			'code'	 => 500,
			'message' => 'Server error saving product.'
		);
		echo json_encode($result);
		mysqli_close($db);
		$app->stop();
	}
	// Si se ha insertado correctamente el producto se procede a insertar sus imagenes correspondientes
	else{
		foreach ($data['IMAGES'] as $image) {
			$imagenPrincipal = 0;
			if($image['IMAGEN_PRINCIPAL'] === '1'){
				$imagenPrincipal = 1;
			}
			$query = "INSERT INTO PRODUCT_IMAGES (`ID_IMAGE`, `ID_PRODUCT`, `URL_IMAGE`, `IMAGEN_PRINCIPAL`, `ENABLE`) ".
			"VALUES(NULL,".
			"{$idProducto},".
			"'{$image['URL_IMAGE']}',".
			"$imagenPrincipal,".
			"true".
			");";

			$db->query($query);

			$idImagen = $db->insert_id;

			if($idImagen == 0){
				$result = array(
					'status' => 'error',
					'code'	 => 500,
					'message' => 'Server error saving product images.'
				);
				echo json_encode($result);
				mysqli_close($db);
				$app->stop();
			}
		}
		$result = array(
			'status' => 'success',
			'code'	 => 200,
			'message' => 'Product created successfully.'
		);
	}

	echo json_encode($result);
});

// ACTUALIZAR UN PRODUCTO
$app->post('/update-product/:productId','authenticate', function($id) use($db, $app){
	$json = $app->request->post('json');
	$data = json_decode($json, true);

	$headers = apache_request_headers();
	$user = $headers['User'];
	
	// Se obtienen los datos del usuario
	$sql = 'SELECT * FROM USERS WHERE USER_NAME = \''.$user.'\'';
	$query = $db->query($sql);
	$userReg = $query->fetch_assoc();
	
	// Se obtienen los datos del producto
	$sql = 'SELECT * FROM PRODUCTS WHERE ID_PRODUCT = '.$id .';';
	$query = $db->query($sql);

	$producto = null;
	if($query->num_rows == 1){
		$producto = $query->fetch_assoc();
	} else {
		$result = array(
			'status' 	=> 'error',
			'code'		=> 404,
			'message' 	=> 'Product not found.'
		);
		echo json_encode($result);
		mysqli_close($db);
		$app->stop();
	}
	
	// Se comprueba si el producto pertenece al usuario, de lo contrario se devuelve un error
	if($producto['ID_USER'] != $userReg['ID_USER']){
		$result = array(
			'status' 	=> 'error',
			'code'		=> 401,
			'message' 	=> 'The user is not the owner of the product.'
		);
		echo json_encode($result);
		mysqli_close($db);
		$app->stop();
	} 
	
	$message = 'Error creating the product:';
	$error = false;
	
	$result = array(
		'status' 	=> 'error',
		'code'		=> 400,
		'message' 	=> $message
	);

	// Comprobacion de que se facilitan todos los datos del producto para su alta
	if(!isset($data['NAME'])){
		$message = $message.' Name of the product required.';
		$error = true;
	}

	if(!isset($data['DESCRIPTION'])){
		$message = $message.' Description of the product required.';
		$error = true;
	}

	if(!isset($data['PRICE'])){
		$message = $message.' Price of the product required.';
		$error = true;
	}
	
	if(!isset($data['ID_PRODUCT_CATEGORY'])){
		$message = $message.' Category of the product required.';
		$error = true;
	}
	// Si falta algun campo se devuelve el error con los campos que faltan por cubrir
	if($error){
		$result['message'] = $message;
		echo json_encode($result);
		mysqli_close($db);
		$app->stop();
	}
	
	// Actualizamos la fecha de modificacion del producto
	date_default_timezone_set('Europe/Madrid');
	$fecha = new DateTime();
	$db_date = date('Y-m-d H:i:s',$fecha->getTimestamp());
	
	$sql = "UPDATE PRODUCTS SET ".
	"NAME = '{$data["NAME"]}', ".
	"DESCRIPTION = '{$data["DESCRIPTION"]}', ".
	"PRICE = {$data["PRICE"]}, ".
	"UPDATE_DATE = '{$db_date}', ".
	"ID_PRODUCT_CATEGORY = {$data["ID_PRODUCT_CATEGORY"]} ".
	"WHERE ID_PRODUCT = ".$id;

	$query = $db->query($sql);

	if(!$query){
		$result = array(
			'status' 	=> 'error',
			'code'		=> 500,
			'message' 	=> 'Error updating product data '.$id
		);
		echo json_encode($result);
		mysqli_close($db);
		$app->stop();
	}
	// Consultamos sus imagenes para ver si se modifico alguna o se añadio o elimino alguna imagen
	$sql = "SELECT * FROM PRODUCT_IMAGES WHERE ID_PRODUCT = ".$id .";";
	$query = $db->query($sql);
	//En dbImages se encuentran las imagenes almacenadas en BD del producto
	$dbImages = array();
	while ($image = $query->fetch_assoc()) {
		$dbImages[] = $image;
	}


	// Alta de nuevas imagenes 
	foreach ($data['IMAGES'] as $image) {
		// Si el ID_IMAGE es nulo significa que la imagen es nueva y se debe dar de alta
		if($image["ID_IMAGE"] == null){
			$imagenPrincipal = 0;
			if($image['IMAGEN_PRINCIPAL'] === TRUE){
				$imagenPrincipal = 1;
			}
			$sql = "INSERT INTO PRODUCT_IMAGES (`ID_IMAGE`, `ID_PRODUCT`, `URL_IMAGE`, `IMAGEN_PRINCIPAL`, `ENABLE`) ".
			"VALUES(NULL,".
			"{$id},".
			"'{$image['URL_IMAGE']}',".
			"$imagenPrincipal,".
			"true".
			");";
			$db->query($sql);

			$idImagen = $db->insert_id;

			if($idImagen == 0){
				$result = array(
					'status' => 'error',
					'code'	 => 500,
					'message' => 'Server error saving product images.'
				);
				echo json_encode($result);
				mysqli_close($db);
				$app->stop();
			}
		} 

	}

	// Actualizacion de imagenes existentes en BD (ID_IMAGEN != NULL)
	foreach ($dbImages as $dbImage) {
		$deleteImage = true;
		foreach ($data['IMAGES'] as $image) {
			if($dbImage["ID_IMAGE"] != null && $dbImage["ID_IMAGE"] == $image["ID_IMAGE"]){
				$deleteImage = false;
				$updateImage = false;
				// Se comprueba si alguno de sus campos ha cambiado para hacer el update en BD
				if($dbImage["URL_IMAGE"] != $image["URL_IMAGE"]){
					$updateImage = true;
				}
				if($dbImage["IMAGEN_PRINCIPAL"] != $image["IMAGEN_PRINCIPAL"]){
					$updateImage = true;
				}
				// Si ha cambiado algun valor se actualizan los valores de la imagen en BD
				if($updateImage){
					$db_date = date('Y-m-d H:i:s',$fecha->getTimestamp());
					$sql = "UPDATE PRODUCT_IMAGES SET ".
					"URL_IMAGE = '{$image["URL_IMAGE"]}', ".
					"IMAGEN_PRINCIPAL = '{$image["IMAGEN_PRINCIPAL"]}', ".
					"UPDATE_DATE = '{$db_date}', ".
					"WHERE ID_IMAGE = ".$dbImage["ID_IMAGE"];
					$query = $db->query($sql);
					if(!$query){
						$result = array(
							'status' 	=> 'error',
							'code'		=> 500,
							'message' 	=> 'Error updating image '.$image["ID_IMAGE"]
						);
						echo json_encode($result);
						mysqli_close($db);
						$app->stop();
					}
				}
				break;
			}
		}
		// Borrado de imagenes
		// Si la imagen en bd no se encuentra el array de imagenes del post, la imagen se borra de BD
		if($deleteImage){
			$sql = "DELETE FROM PRODUCT_IMAGES WHERE ID_IMAGE = ".$dbImage["ID_IMAGE"].";";
			$query = $db->query($sql);
			if(!$query){
				$result = array(
					'status' 	=> 'error',
					'code'		=> 500,
					'message' 	=> 'Error deleting image '.$image["ID_IMAGE"]
				);
				echo json_encode($result);
				mysqli_close($db);
				$app->stop();
			}
		}
	}

	$result = array(
		'status' 	=> 'success',
		'code'		=> 200,
		'message' 	=> 'Product and its images updated successfully.'
	);

	echo json_encode($result);

});



$app->run(); 