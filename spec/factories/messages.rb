FactoryBot.define do
  factory :message do
    association :chatroom
    username { Faker::Name.name }
    content { Faker::Lorem.sentence }
  end
end
