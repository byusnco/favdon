class User < ApplicationRecord

  has_many :statuses

  def get_statuses
    statuses = []
    res = self.client.statuses(self.instance_account_id, limit: 40)
    statuses << res if res.count > 0
    i = 0
    # currently limit to 10 api requests
    while res.count > 0 && statuses.count <= 10
      res = self.client.statuses(self.instance_account_id, limit: 40, max_id: statuses[i].last.id)
      statuses << res if res.count > 0
      i += 1
    end
    return statuses.map{ |collection| collection.to_a }.flatten
  end

  def client
    Mastodon::REST::Client.new(base_url: "https://#{self.instance}", bearer_token: self.token)
  end

end
