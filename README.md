# README

# DB設計

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, add_index|

### Association
- has_many :members
- has_many :groups, through: :members
- has_many :chats

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :members
- has_many :users, through: :members
- has_many :chats


## membersテーブル

|Column|Type|Options|
|------|----|-------|
|users_id|references|null: false, foreign_key: true|
|groups_id|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## chatsテーブル

|Column|Type|Options|
|------|----|-------|
|groups_id|references|null: false, foreign_key: true|
|users_id|references|null: false, foreign_key: true|
|body|text|
|image|string|

### Association
- belongs_to :group
- belongs_to :user


