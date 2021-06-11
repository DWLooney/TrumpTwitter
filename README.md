# TrumpTwitter  
Database Archive WebApp of tweets from various popular United States Democratic and Republican candidates. 

This app can be used by users that are concerned with the elections of the United States 
and either want to fact check Twitter posts or simply follow the latest trends of the candidates on Twitter.

Features: Filter by time frame, retweet count, or keyword
Stack: NextJS using NodeJS and React, MariaDB, Python
  
  
## TO BUILD
-Download node.JS with NPM, add NPM to PATH.

-Download MariaDB.

-Download Python 3, add Python to PATH (ensure your Python version matches your system architecture, i.e. 64-bit).

-For Python dependencies, run in the Python subdirectory:\
 pip install mysqlclient\
 pip install mysql-connector\
 pip install tweepy


-To run locally, in 'my.ini', add the following line under '[mysqld]':  
 bind-address = 127.0.0.1

-Import trumptweeter.sql to the MariaDB instance.  

-Open with your favorite IDE.

-Run NPM install in the root directory.

-Run NPM run dev in the root directory.

## Example Screenshots
![Screenshot 1](https://i.imgur.com/NhLD0AB.png)  

![Screenshot 2](https://i.imgur.com/Avx6yhu.png)

![Screenshot 3](https://i.imgur.com/PK7SMEY.png)

