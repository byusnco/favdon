# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(username: 'foloinfo', avatar: 'https://s3-ap-northeast-1.amazonaws.com/trickle.ink/accounts/avatars/000/000/002/original/281e57d7d21581af.jpg', url: 'https://trickle.ink/@foloinfo', note: "<p><a href=\"http://drip.ink/\" rel=\"nofollow noopener\" target=\"_blank\"><span class=\"invisible\">http://</span><span class=\"\">drip.ink/</span><span class=\"invisible\"></span></a> 開発・運営者です。Mastodonインスタンス <a href=\"https://trickle.ink/\" rel=\"nofollow noopener\" target=\"_blank\"><span class=\"invisible\">https://</span><span class=\"\">trickle.ink/</span><span class=\"invisible\"></span></a> の管理も行っています。不明なこと、要望などあれば教えて下さい。</p>", statuses_count: 141, uid: 'foloinfo@trickle.ink')
