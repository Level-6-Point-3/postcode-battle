<?php

use Jacwright\RestServer\RestException;
use Jacwright\RestServer\RestServer;

require 'vendor/autoload.php';

spl_autoload_register(); // don't load our classes unless we use them

$mode = 'debug'; // 'debug' or 'production'
$server = new RestServer($mode);
// $server->refreshCache(); // uncomment momentarily to clear the cache if classes change in production mode

$server->addClass('LgaController');
$server->addClass('AttributeController');
$server->addClass('BattleController');

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

class BattleController extends DataAccess {

	/**
	 * @url GET /battle/$winnerId/$loserId
	 * @param int $winnerId
	 * @param int $loserId
	 * @return array[]
	 * @throws RestException
	 */
	public function battle( $winnerId, $loserId ) {

		$lga = new LgaController();
		$winner = $lga->get( $winnerId );
		$loser  = $lga->get( $loserId  );

		if ( !$winner ) {
			throw new RestException( 404, "LGA $winnerId not found." );
		}

		if ( !$loser ) {
			throw new RestException( 404, "LGA $loserId not found." );
		}

		$attributesLoader = new AttributeController();
		$attributes = $attributesLoader->listAll();

		$winnerAttributes = $this->attributesFor( $winnerId );
		$loserAttributes  = $this->attributesFor( $loserId  );

		$winner[ 'attributes' ] = array();
		$loser [ 'attributes' ] = array();

		foreach( $attributes as $attribute ) {

			$attributeId = $attribute[ 'attributeId' ];
			$winnerValue = array_key_exists( $attributeId, $winnerAttributes ) ? $winnerAttributes[ $attributeId ] : null;
			$loserValue  = array_key_exists( $attributeId, $loserAttributes  ) ? $loserAttributes [ $attributeId ] : null;

			if ( !$winnerValue || !$loserValue ) {
				continue;
			}

			$result = $attributesLoader->compare( $winnerValue, $loserValue, $attribute );

			if ( $result === AttributeController::BETTER ) {
				$winner[ 'attributes' ][ $attributeId ] = $winnerValue;
				$loser [ 'attributes' ][ $attributeId ] = $loserValue;
			}
		}

		return array(
			'winner'     => $winner,
			'loser'      => $loser,
			'attributes' => $attributes,
		);

	}

	/**
	 * @param $lgaId
	 * @return array Key is the attribute id, and the value is the attribute value.
	 */
	private function attributesFor( $lgaId ) {

		$attributes = $this->select(
			<<<SQL
SELECT attributeId, attributeValue
FROM attributeValues
WHERE lgaId = :lgaId
SQL
			, array( ':lgaId' => $lgaId )
		);

		$results = array();
		foreach ( $attributes as $row ) {
			$results[ $row[ 'attributeId' ] ] = $row[ 'attributeValue' ];
		}
		return $results;
	}

}

class AttributeController extends DataAccess {

	const BETTER  = 1;
	const WORSE   = 2;
	const EQUAL   = 3;
	const UNKNOWN = 4;

	public function compare( $valueOne, $valueTwo, array $attribute ) {

		$compare = strtolower( $attribute[ 'comparator' ] );

		if ( $compare == "?" || strlen( trim( $valueOne ) ) === 0 || strlen( trim( $valueTwo ) ) === 0 ) {
			return self::UNKNOWN; // TODO: Don't have question markes in the source data...
		}

		if ( $compare == 'higher' || !$compare ) { // TODO: Remove the !$compare, should have higher or lower value instead.
			if ( $valueOne > $valueTwo  ) {
				return self::BETTER;
			} else if ( $valueTwo > $valueOne ) {
				return self::WORSE;
			} else {
				return self::EQUAL;
			}
		} else if ( $compare == 'lower' ) {
			if ( $valueOne < $valueTwo ) {
				return self::BETTER;
			} else if ( $valueTwo < $valueOne ) {
				return self::WORSE;
			} else {
				return self::EQUAL;
			}
		} else {
			throw new RestException( "500", "Comaprator for attribute {$attribute['AttributeName']} should be 'lower' or 'higher', but it was '$compare'.'" );
		}

	}

	/**
	 * @url GET /attributes/list
	 * @return array
	 */
	public function listAll() {
		return $this->select( <<<SQL
SELECT
	attributeId,
	attributeName,
	attributeDescription,
	categoryId,
	categoryName,
	positivePhrase,
	negativePhrase,
	comparator,
	denominator,
	denominatorRationale,
	dataSourceLink,
	dataSourceRationale,
	dataSourceDate
FROM
	attributemetadata
SQL
);
	}

}