class AddAuthenticationTokenToUser < ActiveRecord::Migration

  def change

    add_column :users, :token_authenticatable, :string
    add_column :users, :authentication_token, :string, :unique => true

  end

end
