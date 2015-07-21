-- Helper query to show the relative values of each attribute for each LGA.
-- Useful for diagnosing the bootstrap.prepare-relative-positions.sql script.

SELECT
  attrValue.attributeId, attrValue.lgaId, attrValue.attributeValue, attrValue.relativePosition,
  lga.name,
  attrMeta.attributeName, attrMeta.comparator
FROM
  attributeValues AS attrValue
  JOIN attributeMetadata as attrMeta ON ( attrMeta.attributeId = attrValue.attributeId )
  JOIN lga ON ( lga.id = attrValue.lgaId )
ORDER BY attrValue.attributeId ASC, attrValue.relativePosition ASC;
