/* global daum */
import React, { Component } from 'react';
import './App.css';




const infowindow = new daum.maps.InfoWindow({zIndex:1});

var map  = null;

var markers = [];
var myFavRes = [];
var myFavResPlaces = [];
if(window.localStorage.getItem('localArray') == null){

} else{
    myFavRes = window.localStorage.getItem('localArray').split(',');
}

if(window.localStorage.getItem('placeArray') == null){

} else{
    //myFavResPlaces = window.localStorage.getItem('placeArray');
}
var myFavResMarkers = [];

class Map extends Component {

  searchBtn = () => {
    this.searchRes(document.getElementById("searchInput").value, this.placesSearchCB);
  }

  searchRes = (text ,callbackFunc) => {
    var ps = new daum.maps.services.Places();
    ps.keywordSearch(text, callbackFunc);
  }

  
  placesSearchCB = (data, status, pagination) =>  {
    if (status === daum.maps.services.Status.OK) {
        var bounds = new daum.maps.LatLngBounds();
        for (var i=0; i<data.length; i++) {
            this.displayMarker(data[i]);
            bounds.extend(new daum.maps.LatLng(data[i].y, data[i].x));
        }
        map.setBounds(bounds);
        console.log('worononnronor333333ng');
    }
  }

  displayMarker = (place) => {
    var marker = new daum.maps.Marker({
        map:map,
        position: new daum.maps.LatLng(place.y, place.x)
    });
    markers.push(marker);
    daum.maps.event.addListener(marker, 'click', () => {
        infowindow.setContent('<div style="padding:5px;font-size:12px";>' + place.place_name + '</div>');
        infowindow.open(map, marker);
        myFavRes.push(place.place_name)
        console.log(place);
        myFavResPlaces.push(place);
        console.log(myFavResPlaces)
        myFavResMarkers.push(marker)
        this.setMarkers(null, markers);
        this.setMarkers(map, myFavResMarkers);
        window.localStorage.setItem('localArray', myFavRes)
        window.localStorage.setItem('placeArray', myFavResPlaces)
        window.localStorage.setItem('shitArr', JSON.stringify({places:myFavResPlaces}))
        document.getElementById("myResList").innerText = window.localStorage.getItem('localArray');
    })
  }

  

  pickRandom = () => {
    var ranNum = Math.floor(Math.random() * (myFavRes.length));
    alert( '오늘 갈 집은 ...' + myFavRes[ranNum]);
  }

  setMarkers = (map, markers) => {
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
  }

  componentDidMount() {        
    map  = new daum.maps.Map(document.getElementById('map'), {
      center: new daum.maps.LatLng(33.450701, 126.57066),
      level: 3});

    document.getElementById("myResList").innerText = window.localStorage.getItem('localArray') == null ? '아직 존재하지않습니다.': window.localStorage.getItem('localArray');
  }
                                                  
  render() {
    return (
    <div >
      <div className="App" id="map" style={{width:'100%' , height:500 , margin: 'auto' }} ></div>
      <div  style={{margin: 'auto' , width: 500}}>
        <input id="searchInput" type="text" placeholder="일산 진할매 닭한마리"></input>
        <button id="searchBtn" type='button' onClick={this.searchBtn}>검색</button>
        <div id="myResList"></div>
        <button id="randomBtn" type="button" onClick={this.pickRandom}>뽑기</button>
        <div>{JSON.parse(window.localStorage.getItem('shitArr')).places[0].place_name}</div>
      </div>
      
    </div>
    );
  }
}




export default Map;