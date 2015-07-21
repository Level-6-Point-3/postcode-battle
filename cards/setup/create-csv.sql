.mode csv
.headers on

SELECT
  lga.id as lgaId,
  lga.name as lgaName,
  lga.imageURL as lgaImageUrl,
  lga.imageSource as lgaImageSource,
  attribute.attributeName,
  attribute.attributeDescription,
  attribute.categoryName,
  value.attributeValue,
  value.relativePosition
FROM lga
  JOIN attributeValues as value ON ( lga.id = value.lgaId )
  JOIN attributemetadata as attribute ON ( attribute.attributeId = value.attributeId )
WHERE
  lga.name IN (
    'Knox',
    'Yarra Ranges',
    'Melbourne',
    'Hobsons Bay',
    'Casey',
    'Ballarat',
    'Glen Eira',
    'Melbourne',
    'Monash',
    'Whitehorse',
    'Yarra'
  )
  AND lower( attribute.comparator ) IN (
    'higher', 'lower'
    -- 1, -- Number of Schools
    -- 11, -- Number of Kindergardens
    -- 2, -- Number of Hospitals/GPs
    -- 4 -- Crime Rate
  )
  AND (
    lower( attribute.categoryName ) IN (
      'education',
      'health',
      'population',
      'safety'
    ) OR lower( attribute.attributeName ) IN (
      'number of businesses',
      'average total income',
      'unemployment rate',
      'conservative and natural environment',
      'inland water area',
      'traffic volume',
      'bus stops',
      'train stations'
    )
  )
GROUP BY lga.id, attribute.attributeId;
