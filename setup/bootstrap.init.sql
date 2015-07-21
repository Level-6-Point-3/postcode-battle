CREATE TABLE lga (
  name character,
  id integer,
  imageURL character,
  imageSource character
);


CREATE TABLE attributeMetadata (
  attributeId character,
  attributeName character,
  attributeDescription character,
  categoryId character,
  categoryName character,
  positivePhrase character,
  negativePhrase character,
  comparator character,
  denominator character,
  denominatorRationale character,
  dataSourceLink character,
  dataSourceRationale character,
  dataSourceDate character,
  middle number
);


CREATE TABLE attributeValues (
  attributeId integer,
  lgaId integer,
  lga character,
  attributeValue number,
  relativePosition number
);

.mode csv lga
.import 'data/LGAs - Sheet1.csv' lga

.mode csv attributeMetadata
.import 'data/attributemetadata - Sheet1.csv' attributeMetadata

.mode csv attributeValues
.import 'data/All Attribute Values - Sheet1.csv' attributeValues
