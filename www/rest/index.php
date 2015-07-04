<?php

use Jacwright\RestServer\RestServer;

require 'vendor/autoload.php';

spl_autoload_register(); // don't load our classes unless we use them

$mode = 'debug'; // 'debug' or 'production'
$server = new RestServer($mode);
// $server->refreshCache(); // uncomment momentarily to clear the cache if classes change in production mode

$server->addClass('LgaController');
$server->addClass('AttributeController');

$server->handle();

abstract class DataAccess {

	private $pdo;

	public function __construct() {
		$dir = dirname( dirname( dirname( $_SERVER['SCRIPT_FILENAME'] ) ) );
		$this->pdo = new PDO( "sqlite:$dir/postcode-battle.db" );
		$this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	}

	protected final function pdo() {
		return $this->pdo;
	}

	protected final function select( $query ) {
		$result = $this->pdo->query( $query );
		return $result->fetchAll( PDO::FETCH_ASSOC );
	}

}

class LgaController extends DataAccess {

	/**
	 * @url GET /lga/list
	 * @return array
	 */
	public function listAll() {
		$result = $this->select( "SELECT * FROM lga;" );
		return array_map(
			function( $lga ) {
				return array(
					'id' => $lga[ 'id' ],
					'name' => $lga[ 'name' ]
				);
			}, $result
		);
	}

	/**
	 * @url GET /lga/$id
	 * @param int $id
	 * @return array
	 */
	public function get($id) {
		return array( 'id' => 1, 'name' => "Boronia" );
	}

	/**
	 * @url GET /lga/search/$query
	 * @param string $query
	 * @return array
	 */
	public function search($query) {
		return array( 'id' => 1, 'name' => "Brunswick" );
	}

}

class AttributeController extends DataAccess {

	/**
	 * @url GET /attributes/list
	 * @return array
	 */
	public function listAll() {
		return array(
			array(
				'id' => 1,
				'name' => "Housing affordability",
				'betterIf' => 'lower',
				'positiveMessage' => "You can actually afford houses here",
				'negativeMessage' => "You'll never buy here."
			),
			array(
				'id' => 1,
				'name' => "Hosing value",
				'betterIf' => 'higher',
				'positiveMessage' => "Your house is worth heaps here!",
				'negativeMessage' => "Good luck selling in this market :("
			),
			array(
				'id' => 1,
				'name' => "Crime",
				'betterIf' => 'lower',
				'positiveMessage' => "Can't put a price on your safety.",
				'negativeMessage' => "Feel like getting robbed?"
			),
			array(
				'id' => 1,
				'name' => "Health Services",
				'betterIf' => 'higher',
				'positiveMessage' => "Not far to a hospital from this place.",
				'negativeMessage' => "What's wrong with catching a train and three buses to get to the hospital at midnight?"
			),
		);
	}

}