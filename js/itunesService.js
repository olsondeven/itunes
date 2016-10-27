angular.module('itunes').service('itunesService', function($http, $q){
  //This service is what will do the 'heavy lifting' and get our data from the iTunes API.
  //Also note that we're using a 'service' and not a 'factory' so all your methods you want to call in your controller need to be on 'this'.

  //Write a method that accepts an artist's name as the parameter, then makes a 'JSONP' http request to a url that looks like this
  this.getArtistInfo = function(artist) {//function to request data from artist requested by user

    var defer = $q.defer();//this is defering promise , making a promise(line 28)

    //https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
    //Note that in the above line, artist is the parameter being passed in.
    //You can return the http request or you can make your own promise in order to manipulate the data before you resolve it.

    $http({//http request
      method: 'JSONP',//gets data from server through API, jsonp is the fromat that itunes uses
      url: 'https://itunes.apple.com/search?term='+artist+'&callback=JSON_CALLBACK'//has to be used with JSONP

    }).then(function(response){//this is dealing this the promised returned from my request to the API

      // console.log(response);
      if (response) {//if response is truthy continue
        var arrSongs = formatInfo(response.data.results);
        defer.resolve(arrSongs);//if this request works then give the info gathered from the API
      }
    });
    //********************best way to use defer is for when you need to make sure all info being used is present to your function can run accurately***********************
    return defer.promise;//if the request didnt work give back a promise that will get info when possible
  };

  function Format_Artist_Info(albumArt, artist, collection, collectionPrice, play, type){
    this.AlbumArt = albumArt;
    this.Artist = artist;
    this.Collection = collection;
    this.CollectionPrice = collectionPrice;
    this.Play = play;
    this.Type = type;
  };

  function formatInfo(arrOfObj){
    var arrArtistSongs = [];
    for(var i = 0; i < arrOfObj.length; i++){
      arrArtistSongs.push(new Format_Artist_Info(arrOfObj[i].artworkUrl30, arrOfObj[i].artistName, arrOfObj[i].collectionName, arrOfObj[i].collectionPrice, arrOfObj[i].previewUrl, arrOfObj[i].kind));
    }
    return arrArtistSongs;
  }

  //create a object literal
    // Go to the next step in the README (Tie in your controller). You will come back to these instructions shortly.
    //
    // You need to sort the data you get back from the itunes API to be an object in the following format.
    /*
      AlbumArt: "http://a3.mzstatic.com/us/r30/Features4/v4/22/be/30/22be305b-d988-4525-453c-7203af1dc5a3/dj.srlprmuo.100x100-75.jpg"
      Artist: "Nelly"
      Collection: "Nellyville"
      CollectionPrice: 11.99
      Play: "http://a423.phobos.apple.com/us/r1000/013/Music4/v4/4a/ab/7c/4aab7ce2-9a72-aa07-ac6b-2011b86b0042/mzaf_6553745548541009508.plus.aac.p.m4a"
      Type: "song"
  */
  //constructor for formating data and giving it to controller as object



  //the iTunes API is going to give you a lot more details than ng-grid wants. Create a new array and then loop through the iTunes data pushing into your new array objects that look like the above data. Make sure your method returns this finalized array of data.
  // When this is complete, head back to your controller.


});//closing brackets
