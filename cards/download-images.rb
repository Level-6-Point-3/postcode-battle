require 'open-uri'
require 'rmagick'
require 'csv'

CSV.foreach('build/cards.csv', { :col_sep => ',', :headers => :first_row }) do |row|
  url = row[ 'lgaImageUrl' ]
  lga_id = row[ 'lgaId' ]
  lga_name = row[ 'lgaName' ]
  file_name = "build/images/lga/#{lga_id}.png"

  print "Preparing LGA #{lga_name} (#{lga_id}):\n"

  if File.exist? file_name

    print "  File #{file_name} already exists.\n"

  else

    print "  Couldn't find #{lga_id}.png, so converting from original.\n"
    tmp_file_name = "build/images/lga/downloaded/#{lga_id}-downloaded"

    unless File.exists? tmp_file_name
      print "  Couldn't find cached #{tmp_file_name}, so downloading from #{url}..."
      open(url, 'rb') do |remote_file|
        print " Done!\n"
        File.open( tmp_file_name, 'wb' ).write remote_file.read
      end
    end

    print "  Converting #{tmp_file_name} to #{file_name}..."
    img = Magick::ImageList.new tmp_file_name
    img = img.resize_to_fill 825, 1125
    img.write file_name
    print " Done!\n"

  end

end
