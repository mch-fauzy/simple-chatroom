require 'rails_helper'

RSpec.describe Message, type: :model do
  describe 'associations' do
    it { is_expected.to belong_to(:chatroom) }
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:username) }
    it { is_expected.to validate_presence_of(:content) }
  end

  describe 'factory' do
    it 'has a valid factory' do
      message = build(:message)
      expect(message).to be_valid
    end
  end
end
