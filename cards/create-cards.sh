#!/bin/bash

if [ "$1" = "clean" ]; then

	echo "Removing build/ directory..."
	if [ -d build ]; then
		rm -r build
	fi
	exit

elif [ "$1" = "build" ]; then

	echo "Building deck..."
	echo "Making build/ directory..."
	mkdir -p build/images/lga/downloaded

	echo "Creating .csv file from database..."
	cat setup/create-csv.sql | sqlite3 ../postcode-battle.db > build/cards.csv

	echo "Downloading images from internet..."
	ruby download-images.rb

	ruby gen.rb
	exit

else

	echo "Usage: ./create-cards.sh build"
	echo "       ./create-cards.sh clean"

fi

