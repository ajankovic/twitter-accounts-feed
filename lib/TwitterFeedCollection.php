<?php
/*
Author:      Aleksandar Janković, office@ajankovic.com
Description: PHP class TwitterFeedCollection used for Twitter accounts feed
             application.
             Made for demonstration purposes only. Representing collection of
             TwitterFeed objects. Supports sorting of collection to and
             outputing it as JSON.
*/
  
  class TwitterFeedCollection {
    private $feeds = array();
    private $feeds_json;
    private $feeds_array = array();
    private $sort_by = 'time';

    // constructor taking accounts array
    function __construct ($accounts) {
      foreach($accounts as $account){
        $this->feeds[$account] = new TwitterFeed($account);
      }
    }

    public function sort_by($key) {
      $this->sort_by = $key;
    }

    // sorting feeds_array according to sort_by (array sort)
    private function sort_timeline() {
      $copy = array();
      if(!empty($this->feeds_array)){
        foreach($this->feeds_array as $key=>$value) {
		      $temp[$key] = strtolower($value[$this->sort_by]);
	      }
	      arsort($temp);
	      foreach($temp as $key=>$value) {
		      $copy[] = $this->feeds_array[$key];
	      }
	    }
	    return $copy;
    }

    // outputing all feeds in JSON format
    public function to_json() {
      if(empty($json)){
        foreach($this->feeds as $feed){
          $feed->fetch();
          $temp = $feed->get_timeline_array();
          if(isset($temp['error'])){
            $feeds['error'] = $temp;
            break; // if there is an error with twitter api break from loop
          }
          $this->feeds_array = array_merge($this->feeds_array, $temp);
        }
        $feeds['timeline'] = $this->sort_timeline(); // sort timelines
        $this->json = json_encode($feeds);
      }
      return $this->json;
    }
  
  }
