UPDATE attributeValues SET relativePosition = 0;

UPDATE
  attributeValues
SET
  relativePosition =
  (
    SELECT COUNT(*)
    FROM attributeValues AS innerValue
      JOIN attributeMetadata as attr ON ( attr.attributeId = innerValue.attributeId )
    WHERE
      innerValue.attributeId = attributeValues.attributeId
      AND (
        lower(attr.comparator) = 'higher' AND innerValue.attributeValue >= attributeValues.attributeValue
        OR
        lower(attr.comparator) = 'lower' AND innerValue.attributeValue <= attributeValues.attributeValue
      )
  );
