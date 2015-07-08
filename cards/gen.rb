require 'squib'
require 'open-uri'
require 'rmagick'

=begin
CSV.foreach('cards.csv', { :headers => :first_row }) do |row|
  url = row[ 'lgaImageUrl' ]
  lga_id = row[ 'lgaId' ]
  file_name = "images/lga/#{lga_id}.png"

  unless File.exist? file_name then
    print "Couldn't find #{lga_id}.png, so downloading #{url}."
    tmp_file_name = "images/lga/#{lga_id}-tmp"
    File.open(file_name, 'wb') do |local_file|
      open(url, 'rb') do |remote_file|
        tmp_file_name.write(remote_file.read)
        img = Magick::Image.new tmp_file_name

        File.delete tmp_file_name
      end
    end
  end

end
=end

# Back of the card.
Squib::Deck.new(cards: 56, width: 825, height: 1125, layout: 'layout.yml', config: 'config.yml') do

  deck = csv file: 'cards.csv'
  background color: '#66BB66'
  rect layout: 'Background_Title_Back'
  imagePaths = deck[ 'lgaId' ].map { |id| "images/lga/#{id}.png" }
  png file: imagePaths, layout: 'LGA_Image_Back'
  text str: deck[ 'lgaName' ], layout: 'Text_Title_Back'
  text str: deck[ 'categoryName' ], layout: 'Text_Category_Back'

  save_png prefix: 'lga_back_'

end

#Front of the card.
Squib::Deck.new(cards: 56, width: 825, height: 1125, layout: 'layout.yml', config: 'config.yml') do

  deck = csv file: 'cards.csv'
  background color: '#6666BB'
  rect layout: 'Background_Title_Front'
  rect layout: 'Background_Content_Front'
  imagePaths = deck[ 'lgaId' ].map { |id| "images/lga/#{id}.png" }
  png file: imagePaths, layout: 'LGA_Image_Front'
  text str: deck[ 'lgaName' ], layout: 'Text_Title_Front'
  text str: deck[ 'categoryName' ], layout: 'Text_Category_Front'
  text str: deck[ 'attributeName' ], layout: 'Text_Attribute_Front'
  text str: deck[ 'attributeValue' ], layout: 'Text_Value_Front'
  text str: deck[ 'attributeDescription' ], layout: 'Text_Description_Front'

  save_png prefix: 'lga_front_'

end