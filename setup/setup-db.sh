#!/bin/bash

DB=postcode-battle.db

if [ $1 ]; then
	DB=$1
fi

echo "Will create database $DB..."

if [ -f $DB ]; then
	echo "Removing existing $DB database..."
	rm $DB
fi

echo "Creating postcode-battle.db and populating with data..."
cat bootstrap.init.sql | sqlite3 -echo $DB

echo "Calculating relative scores of each LGA for each attribute..."
cat bootstrap.prepare-relative-positions.sql | sqlite3 -echo $DB

echo ""
echo "Done. Database available in: $DB"
echo ""
