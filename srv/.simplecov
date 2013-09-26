SimpleCov.start 'rails' do
  # any custom configs like groups and filters can be here at a central place
end

SimpleCov.at_exit do
  require 'simplecov-rcov'
  SimpleCov.formatter = SimpleCov::Formatter::MultiFormatter[
    SimpleCov::Formatter::HTMLFormatter,
    SimpleCov::Formatter::RcovFormatter,
  ]
  SimpleCov.result.format!
end
