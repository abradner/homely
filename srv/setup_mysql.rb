#!/usr/bin/env ruby_noexec_wrapper


sql_string = "mysql -uroot -p -e \"CREATE USER 'homely'@'localhost' IDENTIFIED BY 'password'; grant all on *.* to 'homely'@'localhost' identified by 'password'; flush privileges;\""


puts "This will add the homely users to a dev database using your mysql root pw"
puts "Enter your mysql root password below"

system(sql_string)


