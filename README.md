# Postcode Battle

**http://postcode-battle.serwylo.com**

We see open government data as a chance for the government to inform its citizens, and for the citizens to inform the government; as a chance to foster communication and cooperation. In our project, we ask: where is infrastructure sufficient, and where are services lacking? If I want to move to a different suburb, where are my needs and interests best catered for?

We gather data of victorian suburbs and LGAs for a number of relevant life quality indicators. These indicators - collected from a wealth of open government datasets - include housing prices, number of schools and medical service providers, and crime and accident statistics. We summarize the data into a general "liveability index" for each LGA, and allow users to specify -and weigh- indicators of interest. By displaying the results as a colour coded map, we allow an intuitive understanding the results.

Our project identifies both benefits and deficiencies of living in certain areas, and offers suggestions where strategic investment can increase the quality of life.

# GovHack

This project was created over a single weekend of GovHack 2015 in Melbourne. 

The web page at http://postcode-battle.serwylo.com is as it was at the end of GovHack. It will stay this way for judging purposes.

To visit the more up to date version, including development that occured after the GovHack competition, check out http://new.postcode-battle.serwylo.com.

# Running Website

## Dependencies

The following dependencies will likely be available in most linux package managers:

* sqlite3
* php
* php-sqlite

To get the REST server running, you will also need to [install composer](https://getcomposer.org) and then run:

`./composer.phar install`

## Setting up the database

There should be a database already included in the git repository (`postcode-battle.db`). However, if the data which went into creating this database changes, then it can be recreated by using the `setup-db.sh` script. This needs to be run from within the `setup` directory. It will write an sqlite3 database to `setup/postcode-battle.db` by default, for you to then copy to the root of the repository to be used by the webserver.

## Using PHPs inbuilt Webserver

Before running, you should change the `www/assets/js/pb/init.js` file so that the final line says: `PB.env = "dev";`. This will ensure that requests to the PHP server will be directed to http://localhost:8080/.

Then, the webserver can be run by executing the following command from the shell to run PHP's inbuilt webserver (for debugging only):

`php -S localhost:8080 www/`

Where `www/` is the path to the `www/` directory in the repository. For now, it has to be on port 8080.

# Card Game

## Dependencies

The card game is built using a ruby library called "squib" and makes use of ImageMagick to pre-process images of the local government areas.

`gem install rmagick squib`

## Building

In order to generate the cards, cd into the `cards/` directory, and execute:

`create-cards.sh build`

This will download relevant images for the cards, then create cards and put them in the `build/_output` directory. Running

`create-cards.sh clean` will remove the `build/` directory, forcing all images to be re-downloaded next time `create-cards.sh build` is run.

If the `postcode-battle.db` database has changed, then running `create-cards.sh build` again will regenerate the cards with the new data.

There is not currently a way to get the cards into a nice printable format, but that is on the TODO list.
