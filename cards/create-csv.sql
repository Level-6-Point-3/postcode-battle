SELECT
  lga.id as lgaId,
  lga.name as lgaName,
  lga.imageURL as lgaImageUrl,
  lga.imageSource as lgaImageSource,
  attribute.attributeName,
  attribute.categoryName,
  value.attributeValue
FROM lga
  JOIN attributeValues as value ON ( lga.id = value.lgaId )
  JOIN attributemetadata as attribute ON ( attribute.attributeId = value.attributeId )
WHERE
  lga.name IN ( 'Knox', 'Yarra Ranges' )
  AND attribute.attributeId IN (
    1, -- Number of Schools
    11, -- Number of Kindergardens
    2, -- Number of Hospitals/GPs
    4 -- Crime Rate
  );