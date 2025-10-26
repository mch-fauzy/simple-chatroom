require 'rails_helper'

RSpec.describe Chatroom, type: :model do
  describe 'associations' do
    it { is_expected.to have_many(:messages).dependent(:destroy) }
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_uniqueness_of(:name) }
  end

  describe 'factory' do
    it 'has a valid factory' do
      chatroom = build(:chatroom)
      expect(chatroom).to be_valid
    end
  end
end
