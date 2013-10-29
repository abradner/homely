class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :lockable, :timeoutable and
  devise :database_authenticatable,
	 :token_authenticatable,
	 :registerable,
         :recoverable,
	 :rememberable,
	 :trackable,
	 :validatable
         # Non-default modules used by homely:
         # (none)
         # Modules we will use in the future
         # :confirmable, :omniauthable

  VALID_ROLES = %w( admin user guest )

  ELEVATION_TIMEOUT = 1.hour

  scope :administrators, -> { where(role: User.admin_role) }

  validates_presence_of :email, :encrypted_password, :role
  validates_uniqueness_of :email
  validates_inclusion_of :role, in: VALID_ROLES

  before_validation :set_initial_role
  before_destroy :ensure_not_last_admin

  # Methods that return the name of each role
  def self.admin_role
    "admin"
  end

  def self.user_role
    "user"
  end

  def self.guest_role
    "guest"
  end

  def self.valid_roles
    VALID_ROLES
  end


  def self.elevation_timeout
    ELEVATION_TIMEOUT
  end


  # Methods to test if a user has a role
  def admin?
    self.role.eql? User.admin_role
  end

  def normal_user?
    self.admin? || self.role.eql?(User.user_role)
  end

  def guest?
    self.role.eql? User.guest_role
  end

  # Elevated admin
  def elevated?
    return false if self.elevation_time.blank?
    elevated_for = Time.now - self.elevation_time
    return true if elevated_for < ELEVATION_TIMEOUT
    false
  end

  def elevate
    update_attribute(:elevation_time, Time.now)
    save
  end

  def lower
    update_attribute(:elevation_time, nil)
    save
  end

  private

  def ensure_not_last_admin
    return true unless self.admin?

    #If there are no other administrators except this one
    if User.administrators.where('users.id != ?', self.id).count.eql? 0
      false
    end

  end


  # Set a user's role on creation. The first user is admin, after that they are users.
  def set_initial_role
    new_role = User.count.eql?(0) ? User.admin_role : User.user_role
    self.role ||= new_role
  end

end
