<?php
/*
Author:      Aleksandar Janković, office@ajankovic.com
Description: PHP function library used for Twitter accounts feed application.
             Made for demonstration purposes only.
*/

  // getting accounts from passed parameter and converting it to array
  function get_accounts(){
    $query = $_GET['accounts'];

    if(empty($query)){
      exit(); // no account submited -> exit
    }

    // coma separated list to array
    $accounts = preg_split( '/[,\s]+/', $query, -1, PREG_SPLIT_NO_EMPTY );

    return $accounts;
  }

  // auxilary function for simple testing
  function test($test, $message) {
    if($test === true){
      return '<span style="color:green">OK '.$message.'</span><br>';
    }
    return '<span style="color:red">Fail '.$message.'</span><br>';
  }
