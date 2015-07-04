#!/bin/bash

echo "Create new database with:"
echo ""
echo ""
echo "rm postcode-battle.db && sqlite3 postcode-battle.db"
echo ""
echo ""
echo "... and then execute the following commands in sqlite3:"
echo ""
echo ""
echo "CREATE TABLE lga ("
echo "  name character,"
echo "  id integer,"
echo "  area integer,"
echo "  population integer"
echo ");"
echo ""
echo ""
echo "CREATE TABLE attributeMetadata ("
echo "  attributeId character,"
echo "  attributeName character,"
echo "  attributeDescription character,"
echo "  categoryId character,"
echo "  categoryName character,"
echo "  positivePhrase character,"
echo "  negativePhrase character,"
echo "  comparator character,"
echo "  denominator character,"
echo "  denominatorRationale character,"
echo "  dataSourceLink character,"
echo "  dataSourceRationale character,"
echo "  dataSourceDate character"
echo ");"
echo ""
echo ""
echo "CREATE TABLE attributeValues ("
echo "  attributeId integer,"
echo "  lgaId integer,"
echo "  lga character,"
echo "  attributeValue number"
echo ");"
echo ""
echo ""
echo ".mode csv lga"
echo ".import 'data/LGAs - Sheet1.csv' lga"
echo ""
echo ".mode csv attributeMetadata"
echo ".import 'data/attributemetadata - Sheet1.csv' attributeMetadata"
echo ""
echo ".mode csv attributeValues"
echo ".import 'data/All Attribute Values - Sheet1.csv' attributeValues"
echo ""
echo ""
echo "... then copy the database to the relevant path:"
echo ""
echo ""
echo "cp postcode-battle.db ../"
echo ""
echo ""
