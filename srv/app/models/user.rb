class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :lockable, :timeoutable and
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
         # Non-default modules used by homely:
         # (none)
         # Modules we will use in the future
         # :confirmable, :omniauthable


  # TODO replace with real code when defining roles
  def admin?
    true
  end
end
