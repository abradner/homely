require 'spec_helper'

# Specs in this file have access to a helper object that includes
# the DevicesHelper. For example:
#
# describe DevicesHelper do
#   describe "string concat" do
#     it "concats two strings with spaces" do
#       expect(helper.concat_strings("this","that")).to eq("this that")
#     end
#   end
# end
describe DevicesHelper do
  let(:white) {'ffffff'}
  let(:mid_grey)   {'808080'}
  let(:black)   {'000000'}



  it 'should calculate whether something is bright enough to require a black background' do
    expect(helper.background_colour(white)).to eql black
    expect(helper.background_colour(mid_grey)).to eql white
    expect(helper.background_colour(black)).to eql white
  end
end
