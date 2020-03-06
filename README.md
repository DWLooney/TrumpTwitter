# TrumpTwitter  
Database Archive WebApp of tweets from various popular United States Democratic and Republican candidates. 

This app can be used by users that are concerned with the elections of the United States 
and either want to fact check Twitter posts or simply follow the latest trends of the candidates on Twitter.

Features: Filter by time frame, retweet count, favorite count, primary and secondary terms  (TODO). 
Stack: NextJS using NodeJS and React, MariaDB, Python
  
  
## TO BUILD
-Download node.JS with NPM, add NPM to PATH.

-Download MariaDB.

-Download Python 3.

-For Python dependencies:\
 pip install mysql-connector\
 pip install tweepy\
 pip install mysqlclient

-To run locally, in 'my.ini', add the following line under '[mysqld]':  
 bind-address = 127.0.0.1

-Import trumptweeter.sql to the MariaDB instance.  

-Open with your favorite IDE.

-Run NPM install in the root directory.

-Run NPM run dev in the root directory.

