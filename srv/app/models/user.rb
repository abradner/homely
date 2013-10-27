class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :lockable, :timeoutable and
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
         # Non-default modules used by homely:
         # (none)
         # Modules we will use in the future
         # :confirmable, :omniauthable

  VALID_ROLES = %w( admin user guest )

  validates_presence_of :email, :encrypted_password, :role
  validates_uniqueness_of :email
  validates_inclusion_of :role, in: VALID_ROLES


  # TODO replace with real code when defining roles
  def admin?
    self.role.eql? "admin"
  end

  def normal_user?
    self.admin? || self.role.eql?("user")
  end

  def guest?
    self.role.eql?("guest")
  end

  def self.valid_roles
    VALID_ROLES
  end
end
