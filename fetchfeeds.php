<?php
/*
Author:      Aleksandar Janković, office@ajankovic.com
Description: Main fetchfeed script used for Twitter accounts feed application.
             Made for demonstration purposes only. Gets submited accounts, 
             creates collection out of them sorts them out print out as JSON.
*/

  require 'lib/functions.php';

  // parse accounts and return them as array
  $accounts = get_accounts();
  
  require 'lib/TwitterFeed.php';
  require 'lib/TwitterFeedCollection.php';

  // create new feed collection from accounts array
  $feeds = new TwitterFeedCollection($accounts);
  
  // sort feeds by time
  $feeds->sort_by('time');

  // print them out as json
  print $feeds->to_json();
