require 'squib'

num_cards = 141

# Back of the card.
Squib::Deck.new(cards: num_cards, width: 825, height: 1125, layout: 'layout.yml', config: 'config.yml') do

  deck = csv file: 'build/cards.csv'
  background color: '#66BB66'
  rect layout: 'Background_Title_Back'
  image_paths = deck[ 'lgaId' ].map do |id|
    img = "images/lga/#{id}.png"
    if File.exists? img
      img
    else
      'images/lga/unknown.png'
    end
  end

  png file: image_paths, layout: 'LGA_Image_Back'
  text str: deck[ 'lgaName' ], layout: 'Text_Title_Back'
  text str: deck[ 'categoryName' ], layout: 'Text_Category_Back'

  save_png dir: 'build/_output', prefix: 'lga_back_'

end

#Front of the card.
Squib::Deck.new(cards: num_cards, width: 825, height: 1125, layout: 'layout.yml', config: 'config.yml') do

  deck = csv file: 'build/cards.csv'

  bar_width = deck[ 'relativePosition' ].map { |pos| ( 80.0 - pos ) / 80.0 * 725 }
  bar_color = deck[ 'relativePosition' ].map { |pos| '(0,0)(725,0) red@0.0 green@1.0' }

  background color: '#6666BB'
  rect layout: 'Background_Title_Front'
  rect layout: 'Background_Content_Front'
  rect layout: 'Background_Rank_Front'
  rect layout: 'Foreground_Rank_Front', width: bar_width, fill_color: bar_color
  image_paths = deck[ 'lgaId' ].map do |id|
    img = "images/lga/#{id}.png"
    if File.exists? img
      img
    else
      'images/lga/unknown.png'
    end
  end

  font_size_value = deck[ 'attributeValue' ].map do |value|
    value_str = "#{value}"
    if value_str.length <= 4
      150
    elsif value_str.length <= 5
      135
    elsif value_str.length <= 6
      125
    elsif value_str.length <= 7
      110
    end
  end

  ranks = deck[ 'relativePosition' ].map { |rank| "Rank: #{rank}" }
  png file: image_paths, layout: 'LGA_Image_Front'
  text str: deck[ 'lgaName' ], layout: 'Text_Title_Front'
  text str: deck[ 'categoryName' ], layout: 'Text_Category_Front'
  text str: deck[ 'attributeName' ], layout: 'Text_Attribute_Front'
  text str: ranks, layout: 'Text_Rank_Front'
  text str: deck[ 'attributeValue' ], layout: 'Text_Value_Front', font_size: font_size_value
  text str: deck[ 'attributeDescription' ], layout: 'Text_Description_Front'

  save_png dir: 'build/_output', prefix: 'lga_front_'

end
