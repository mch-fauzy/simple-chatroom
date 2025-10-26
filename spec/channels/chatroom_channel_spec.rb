require 'rails_helper'

RSpec.describe ChatroomChannel, type: :channel do
  let(:chatroom) { create(:chatroom) }

  describe '#subscribed' do
    it 'subscribes to the chatroom stream' do
      subscribe(chatroom_id: chatroom.id)

      expect(subscription).to be_confirmed
      expect(subscription).to have_stream_from("chatroom_#{chatroom.id}")
    end

    it 'rejects subscription when chatroom does not exist' do
      expect {
        subscribe(chatroom_id: 99999)
      }.to raise_error(ActiveRecord::RecordNotFound)
    end
  end

  describe '#unsubscribed' do
    it 'unsubscribes from the chatroom stream' do
      subscribe(chatroom_id: chatroom.id)
      expect(subscription).to be_confirmed

      unsubscribe
      expect(subscription).not_to have_streams
    end
  end
end
