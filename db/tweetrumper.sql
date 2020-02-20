-- Start of tweetrumper SQL script.
/* ************************************************************************************************
   Project Phase II
   Group Tweetrumper (MariaDB)
   Authors: Adam
   			Daniel Looney
   			Nazim Zerrouki
   			Samuel Wainright
   Version: 1.0.4
   
   Tweetrumper is a database that stores simulated real-world
   tweet data on candidates.
   
   This SQL Script was tested on MySQL and MariaDB. To run, simply 
	load this script file and run. 
   ************************************************************************************************
*/

-- Drop and create if database exists.
DROP DATABASE IF EXISTS `sql_tweet`;
CREATE DATABASE `sql_tweet`;
USE `sql_tweet`;

-- ************************************************************************************************
--	Part A
--	************************************************************************************************

-- Table candidates: Stores data about a candidate, their Twitter
--							ID and the Party they represent.
--
-- candidate_id: Unique candidate specifier.
-- twitter_id: Unique Twitter ID that reflects the candidate's real-world ID.
-- candidate_name: The candidate's name.
-- party: The candidate's party.

CREATE TABLE `candidates`
(
	candidate_id INT NOT NULL,
	twitter_id INT NOT NULL,
	candidate_name VARCHAR(128) NOT NULL,
   party VARCHAR(64),
   CONSTRAINT check_valid_candidate_id CHECK (candidate_id >= 0),
   CONSTRAINT candidates_pk PRIMARY KEY (twitter_id),
   UNIQUE (candidate_id)
);

-- Table keywords: Stores data about keywords parsed from Twitter posts.
--						 These keywords each have a value that determines their
--						 popularity strength.
--
-- term: The unique keyword from a post.
-- strength: The total amount of times a keyword has been process from a tweet.

CREATE TABLE `keywords`
(
	term VARCHAR(128) NOT NULL,
	strength INT DEFAULT 0 NOT NULL,
	CONSTRAINT check_valid_keyword_strength CHECK (strength >= 0),
	CONSTRAINT keywords_pk PRIMARY KEY (term)
);

-- Table hashtags: Stores data about hashtags parsed from Twitter posts.
--						 These hashtags each have a value that determines their
--						 popularity strength. Hashtags on Twitter are denoted by
--						 the '#' symbol.
--
-- tag: The unique hashtag from a post.
-- strength: The total amount of times a keyword has been process from a tweet.

CREATE TABLE `hashtags`
(
	tag VARCHAR(128) NOT NULL,
	strength INT DEFAULT 0 NOT NULL,
	CONSTRAINT check_valid_hashtag_strength CHECK (strength >= 0),
	CONSTRAINT hashtags_pk PRIMARY KEY (tag)
);

-- Table tweets: Stores data about individual tweets by their unique
--					  tweet ID, their first and secondary keywords, their hashtag, 
--               and the unique Twitter ID of the candidate that posted the
--					  tweet.
--
--	twitter_id: The unique Twitter identifier of a candidate.
--	twitter_post_id: The unique Twitter identifier of a post on Twitter.
-- primary_term: A keyword parsed from the Twitter post.
-- secondary_term: A secondary keyword parse from the Twitter post.
-- tweet_date: The date the tweet was posted.
-- hashtag: A hashtag related to the Twitter post.

CREATE TABLE `tweets`
(
	twitter_id INT NOT NULL,
	twitter_post_id INT NOT NULL,
	primary_term VARCHAR(128),
	secondary_term VARCHAR(128),
	tweet_date DATE NOT NULL,
	hashtag VARCHAR(128),
	CONSTRAINT check_tweet_date CHECK (tweet_date > '2006-03-21 00:00:00'),
	CONSTRAINT tweets_pk PRIMARY KEY (twitter_post_id),
	CONSTRAINT tweets_candidates_fk FOREIGN KEY (twitter_id) 
		REFERENCES candidates(twitter_id)
		ON DELETE CASCADE,
	CONSTRAINT tweets_keywords_prime_fk FOREIGN KEY (primary_term) 
		REFERENCES keywords(term)
		ON DELETE SET NULL,
	CONSTRAINT tweets_keywords_sec_fk FOREIGN KEY (secondary_term) 
		REFERENCES keywords(term)
		ON DELETE SET NULL,
	CONSTRAINT tweets_hashtag_fk FOREIGN KEY (hashtag) 
		REFERENCES hashtags(tag)
		ON DELETE SET NULL
);

-- ************************************************************************************************
-- Part B
-- ************************************************************************************************

-- Inserting tuples into candidates table.

INSERT INTO `candidates`  VALUES(2, 2, 'Trump',     'Republican' );
INSERT INTO `candidates`  VALUES(3, 3, 'Biden',     'Democratic' );
INSERT INTO `candidates`  VALUES(4, 4, 'Warren',    'Democratic' );
INSERT INTO `candidates`  VALUES(5, 5, 'Sanders',   'Democratic' );
INSERT INTO `candidates`  VALUES(6, 6, 'Bloomberg', 'Democratic' );
INSERT INTO `candidates`  VALUES(7, 7, 'Yang', 		'Democratic' );
INSERT INTO `candidates`  VALUES(8, 8, 'Klobuchar', 'Democratic' );
INSERT INTO `candidates`  VALUES(9, 9, 'Pelosi',    'Democratic' );
INSERT INTO `candidates`  VALUES(10,10,'Feinstein',    'Democratic' );
INSERT INTO `candidates`  VALUES(1, 1, 'Conaway',   'Republican' );

-- Inserting tuples into keywords table.

INSERT INTO `keywords`  VALUES('chocked off',  0);
INSERT INTO `keywords`  VALUES('scam',         2);
INSERT INTO `keywords`  VALUES('hoax',         2);
INSERT INTO `keywords`  VALUES('thread',       30 );
INSERT INTO `keywords`  VALUES('losers',       4 );
INSERT INTO `keywords`  VALUES('terror',       40 );
INSERT INTO `keywords`  VALUES('obama',        53 );
INSERT INTO `keywords`  VALUES('tragedy',      61 );
INSERT INTO `keywords`  VALUES('refugees',     7);
INSERT INTO `keywords`  VALUES('Iran', 		   40 );

-- Inserting tuples into hashtags table.

INSERT INTO `hashtags` VALUES( 'WHITEHOUSE', 		1);
INSERT INTO `hashtags` VALUES( 'MAGACHALLENGE', 	2);
INSERT INTO `hashtags` VALUES( 'nytimes', 			3);
INSERT INTO `hashtags` VALUES( 'CNN', 				4);
INSERT INTO `hashtags` VALUES( 'gloablWorming', 	5);
INSERT INTO `hashtags` VALUES( 'impeachment',	    6);
INSERT INTO `hashtags` VALUES( 'AMERICA', 			7);
INSERT INTO `hashtags` VALUES( 'GREAT', 			8);
INSERT INTO `hashtags` VALUES( 'union', 			9);
INSERT INTO `hashtags` VALUES( 'election', 			10);

-- Inserting tuples into tweets table.

INSERT INTO `tweets`  VALUES(1, 100, 	NULL, 		NULL , 		 '2018-03-21',  'WHITEHOUSE');
INSERT INTO `tweets`  VALUES(2, 200, 	NULL, 	   'Iran',		 '2018-04-21',   'MAGACHALLENGE');
INSERT INTO `tweets`  VALUES(3, 300, 	NULL,  	  	'refugees',		 '2019-03-21',  'nytimes');
INSERT INTO `tweets`  VALUES(4, 400,   'Iran',     'terror',	 '2019-09-21',   'CNN');
INSERT INTO `tweets`  VALUES(5, 500,   'refugees',  NULL,  	 	 '2010-03-21',   'gloablWorming');
INSERT INTO `tweets`  VALUES(6, 600, 	NULL, 	    NULL,  	 	 '2011-03-21',  'impeachment');
INSERT INTO `tweets`  VALUES(7, 700,   'terror',   'Iran',		 '2012-03-21',   'AMERICA');
INSERT INTO `tweets`  VALUES(8, 800,    'hoax',       NULL,		 '2014-03-21',  'GREAT');
INSERT INTO `tweets`  VALUES(8, 900,    'hoax',     NULL,		 '2015-03-21', 	 'GREAT');
INSERT INTO `tweets`  VALUES(8, 1000,  'hoax',       NULL,		 '2020-01-01', 	 'GREAT');

-- ************************************************************************************************
-- Part C
-- ************************************************************************************************

-- #1 JOIN OF AT LEAST 3 TABLES
-- Purpose: Retrieves the candidate name of all candidates who have made a tweet,
--				the post idenifier for each tweet, a keyword associated with the post,
--				and the keyword's strength.
-- Expected: A results table with all candidate who have made a tweet with
--				 columns "Candidate Name", "Post", "Keyword", and "Popularity".
SELECT C.candidate_name AS "Candidate Name", T.twitter_post_id AS "Post", T.primary_term AS "Keyword", K.strength AS "Popularity"
FROM candidates AS C 
JOIN tweets AS T 
ON  C.twitter_id=T.twitter_id
JOIN keywords AS K
ON T.primary_term=K.term
ORDER BY C.candidate_name ASC;

-- #2 NESTED QUERY USING ANY OR ALL
-- Purpose: Retrieves any data associated to keywords whose strength is greater than or
--				equal to 40.
-- Expected: A results table of all data that points to keywords who pass 40 >= condition.
SELECT *
FROM tweets
WHERE primary_term = ANY (SELECT term
FROM keywords
WHERE strength >= 40);


-- #3 CORRELATED NESTED QUERY 
-- Purpose: Returns the most popular hashtag that has been used recently. 
-- Expected: A table that includes individual hashtags, their Twitter post
--				 identifiers, and their date created. Columns should be 
--           "Popular Hashtag", "Posts", and "Date Created".
SELECT hashtag AS "Popular Hashtag", twitter_post_id AS "Posts", tweet_date  AS "Date Created"
FROM tweets 
WHERE tweet_date IN (SELECT tweet_date
FROM tweets 
WHERE tweet_date > 20191201
ORDER BY  tweet_date DESC);

--  #4 FULL JOIN 
-- Purpose: Retrieve all candidates who have made tweets within the given date range.
-- Expected: A results table with all candidates two have made tweets during
--				 the given date range and their keywords associated with the candidate.
--				 Columns should be "Candidate Name", "Keyword 1", and "Keyword 2".
SELECT C.candidate_name AS "Candidate Name", T.primary_term AS "Keyword 1", T.secondary_term AS "Keyword 2"
FROM candidates AS C 
LEFT JOIN  tweets AS T 
ON  C.twitter_id=T.twitter_id
WHERE T.tweet_date > 20150101
UNION
SELECT C.candidate_name, T.primary_term, T.secondary_term
FROM candidates AS C
RIGHT JOIN tweets AS T
ON C.twitter_id=T.twitter_id
WHERE T.tweet_date > 20150101;

-- #5 NESTED QUERY WITH UNION, EXCEPT OR INTERSECT
-- Purpose: Returns all tweet identifiers from candidates whom has posted.
SELECT twitter_post_id AS "Candidates with Posts"
FROM tweets
WHERE EXISTS (SELECT twitter_id 
FROM candidates
UNION
SELECT twitter_id
FROM tweets);

-- #6 NON-TRIVIAL QUERY 
-- Purpose: Retrieve the most popular keywords by returning those with strengths over 30.
-- Expected: A results table with all the keywords that have a strength >= 30 and 
--				 produces a single column "Popular".
SELECT term AS "Popular"
FROM keywords
WHERE strength > 30;

-- #7 NON-TRIVIAL QUERY 
-- Purpose: Retrieve the count of tweets with the given term a candidate has made
--				to determine their popularity of the term category (ranking by keywords).
-- Expected: A results table that includes the count of every keyword in a post
--				 made by a given candidate.
SELECT COUNT(T.primary_term) AS "hoax, Klobuchar Popularity"
FROM candidates AS C
JOIN tweets AS T
ON C.twitter_id=T.twitter_id
WHERE T.primary_term LIKE 'hoax'
AND C.candidate_name LIKE 'Klobuchar';

-- #8 NON-TRIVIAL QUERY --
-- Purpose: Retrieve candidate names and hashtag with the given hashtag, grouping by name.
-- Expected: A results table with a candidate with who has a post with the given hashtag,
--				 with columns "Candidate Name" and "Hashtag".
SELECT C.candidate_name AS "Candidate Name", T.hashtag AS "Hashtag"
FROM candidates AS C
JOIN tweets AS T
ON C.twitter_id=T.twitter_id
WHERE T.hashtag LIKE 'GREAT'
GROUP BY C.candidate_name
ORDER BY C.candidate_id ASC;

-- #9 NON-TRIVIAL QUERY --
-- Purpose: Return tweet identifiers whose keywords have strengths greater than 30,
--				denoting their total popularity strength.
-- Expected: A results table with twitter post identfiers that point to posts
--				 with high popularity (30 >=).
SELECT T.twitter_post_id AS "Twitter Posts with High Popularity"
FROM tweets AS T
WHERE T.primary_term IN (SELECT term
FROM keywords
WHERE strength > 30)
AND T.secondary_term IN (SELECT term
FROM keywords
WHERE strength > 30);

-- #10 NON-TRIVIAL QUERY --
-- Purpose: Return candidate names who haven't made a tweet with the given hashtag;
--				the purpose is to select candidates who have not yet commented on a particular
--				event to denote complacency.
-- Expected: A results table of candidate names who have not yet made a post on a topic.
SELECT C.candidate_name AS "Candidate Name"
FROM candidates AS C, tweets AS T
WHERE C.twitter_id=T.twitter_id
AND T.hashtag NOT LIKE 'GREAT';
-- End of tweetrumper SQL script.