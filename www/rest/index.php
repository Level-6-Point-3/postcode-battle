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

	protected final function select( $query, $params = array() ) {
		$statement = $this->pdo->prepare( $query );
		$statement->execute( $params );
		return $statement->fetchAll( PDO::FETCH_ASSOC );
	}

}

class LgaController extends DataAccess {

	/**
	 * @url GET /lga/list
	 * @return array[]
	 */
	public function listAll() {
		return $this->select( "SELECT id, name FROM lga;" );
	}

	/**
	 * @url GET /lga/$id
	 * @param int $id
	 * @return array|null
	 */
	public function get($id) {
		$result = $this->select( "SELECT id, name FROM lga WHERE id = :id", array( ':id' => (int)$id ) );
		return $result ? array_pop( $result ) : null;
	}

	/**
	 * @url GET /lga/search/$query
	 * @param string $query
	 * @return array[]
	 */
	public function search($query) {
		return $this->select( "SELECT id, name FROM lga WHERE name LIKE :query;", array( ':query' => "%$query%" ) );
	}

}

class AttributeController extends DataAccess {

	/**
	 * @url GET /attributes/list
	 * @return array
	 */
	public function listAll() {
		return $this->select( <<<SQL
SELECT
	AttributeID,
	AttributeName,
	AttributeDescription,
	CategoryID,
	CategoryName,
	PositivePhrase,
	NegativePhrase,
	Comparator,
	Denominator,
	DenominatorRationale,
	DataSourceLink,
	DataSourceRationale,
	DataSourceDate
FROM
	attributemetadata
SQL
);
	}

}