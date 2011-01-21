<?php
/*
Author:      Aleksandar Janković, office@ajankovic.com
Description: PHP class TwitterFeed used for Twitter accounts feed application.
             Made for demonstration purposes only. Representing one twitter 
             feed. Feching and getting of feed in both JSON and Array format
             Are encapsulated.
*/
  
  class TwitterFeed {
    private $account;
    private $timeline;
    
    function __construct ($account) {
      $this->account = $account;
    }

    public function fetch() {
      //initialize a new curl resource
      $ch = curl_init();
      
      //Fetch the timeline
      curl_setopt($ch, CURLOPT_URL, 'http://api.twitter.com/1/statuses/user_timeline.json?screen_name='.$this->account);

      // if you have problems with 150 API limit use this link instead
      //curl_setopt($ch, CURLOPT_URL, 'http://terminus.teslix.com/~acafon/projects/fetch.php?username='.$this->account);

      //do not return the header information
      curl_setopt($ch, CURLOPT_HEADER, 0);

      //Give me the data back as a string... Don't echo it.
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
      
      //Warp 9, Engage!
      $this->timeline = curl_exec($ch);
      
      //Close CURL connection & free the used memory.
      curl_close($ch);

      return $this->timeline;
    }

    // get timeline in original json format
    public function get_timeline_json() {
      return $this->timeline;
    }

    // get timeline in array format
    public function get_timeline_array() {
      $feed = array();
      $timeline = json_decode($this->timeline, true);
      if(isset($timeline['error'])){
        $feed = $timeline;
      }else{
        foreach($timeline as $key => $message){
          // converting feed to more clear and friendly format
          $feed[]= array('username'=>$message['user']['screen_name'], 'text'=>$message['text'], 'time'=>strtotime($message['created_at']));
        }
      }
      return $feed;
    }
  
  }
