module ApplicationHelper

  # shorthand for the required asterisk
  def required
    "<span class='required' title='Required'>* Required</span>".html_safe
  end

end