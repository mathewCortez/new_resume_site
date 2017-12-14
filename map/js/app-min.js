function ViewModel(){function l(){lat=42.363885,lng=-71.101504,c=new google.maps.LatLng(lat,lng),b=new google.maps.Map(document.getElementById("map-canvas"),{center:c,zoom:12,zoomControlOptions:{position:google.maps.ControlPosition.RIGTH_BOTTOM,style:google.maps.ZoomControlStyle.SMALL},streetViewControlOptions:{position:google.maps.ControlPosition.RIGHT_BOTTOM},mapTypeControl:!1,panControl:!1}),clearTimeout(a.mapRequestTimeout),google.maps.event.addDomListener(window,"resize",function(){var a=b.getCenter();google.maps.event.trigger(b,"resize"),b.setCenter(a)}),d=new google.maps.InfoWindow({maxWidth:250}),m("02108")}function m(b){var c="http://api.jambase.com/events?zipCode="+b+"&radius=25&startDate="+g+"&page=0&api_key="+e;$.ajax({url:c,dataType:"json",success:function(b){console.log(b);for(var c=b.Events,d=c.length,e=0;e<d;e++){var f=c[e].Venue,g=c[e].Artists[0].Name,h=c[e].TicketUrl;venueLat=f.Latitude,venueLng=f.Longitude,venueName=f.Name,venueAddress=f.Address,venueCity=f.City,venueState=f.State,venueZip=f.ZipCode,a.currentConcerts.push({concertLat:venueLat,concertLng:venueLng,concertVenueName:venueName,concertArtist:g,concertAddress:venueAddress,concertCity:venueCity,concertState:venueState,concertZip:venueZip,concertUrl:h})}console.log("currentconcerts object: "+a.currentConcerts()),a.searchList(a.currentConcerts()),n(a.currentConcerts())}}).fail(function(){alert("Error loading JamBase Api")})}function n(c){arrayVal=c[0],len=c.length,console.log("array length: "+len),$.each(c,function(c,e){function l(){null!==k.getAnimation()?k.setAnimation(null):(k.setAnimation(google.maps.Animation.BOUNCE),setTimeout(function(){k.setAnimation(null)},800))}var f=e.concertLat,g=e.concertLng;if(0===f&&0===g)var f=42.361476,g=-71.05769;var h=new google.maps.LatLng(f,g),i=e.concertArtist,j='<div id="info-window"><h4>    Artist: '+e.concertArtist+"</h4><h5> Venue: "+e.concertVenueName+"</h5><h6> Address: "+e.concertAddress+", "+e.concertCity+", "+e.concertState+" "+e.concertZip+"</h6>";""!==e.concertUrl&&(j+='<a href="'+e.concertUrl+'">Get Tickets</a>'),j+="</div>";var k=new google.maps.Marker({position:h,title:i,animation:google.maps.Animation.DROP,map:b});a.mapMarkerList.push({marker:k,content:j}),google.maps.event.addListener(k,"click",function(){d.setContent(j),d.open(b,k),l()})})}var b,c,d,a=this,e="2c3r8g3yg69xqjsjbgy23h4c",f=new google.maps.Geocoder,g=new Date,h=g.getDate(),j=g.getMonth()+1,k=g.getFullYear();h<10&&(h="0"+h),j<10&&(j="0"+j),g=k+"-"+j+"-"+h,this.currentConcerts=ko.observableArray([]),this.mapMarkerList=ko.observableArray([]),this.searchBar=ko.observable(),this.searchLocation=ko.observable("02108"),this.searchList=ko.observableArray([]),this.toggleVal=ko.observable("hide"),this.changeClass=ko.observable(!1),this.toggleClass=function(){console.log(this.changeClass()),this.changeClass()===!1?(this.changeClass(!0),console.log(this.changeClass())):(this.changeClass(!1),console.log(this.changeClass()))},this.findMarker=function(b){var c=b.concertArtist;for(var d in a.mapMarkerList())c===a.mapMarkerList()[d].marker.title&&google.maps.event.trigger(a.mapMarkerList()[d].marker,"click")},this.searchLoc=function(){function g(a){f.geocode({address:a+", USA"},function(a,b){if(b==google.maps.GeocoderStatus.OK){var e=a[0].geometry.location;c=e.lat(),d=e.lng(),console.log("new lat: "+c+" new lng: "+d)}h(c,d)})}function h(a,c){console.log("Started recenter");var d=new google.maps.LatLng(a,c);b.panTo(d)}var c,d;a.searchLocation(),a.currentConcerts([]),a.searchList([]),console.log(a.currentConcerts()),console.log(a.searchLocation()),a.mapMarkerList([]),m(a.searchLocation()),g(a.searchLocation())},this.searchResults=function(){var c=a.searchBar().toLowerCase();console.log("search elem: "+c);var d=a.currentConcerts();for(a.searchList([]),i=0;i<d.length;i++)d[i].concertArtist.toLowerCase().indexOf(c)!=-1?(a.mapMarkerList()[i].marker.setMap(b),a.searchList.push(d[i]),console.log("currentConcert listing"+d[i].concertArtist)):a.mapMarkerList()[i].marker.setMap(null)},this.toggleList=function(){console.log("toggleList called!"),"hide"===a.toggleVal()?a.toggleVal("show"):a.toggleVal("hide")},this.mapRequestTimeout=setTimeout(function(){alert("Error loading Google Maps.")}),l()}function loadApp(){ko.applyBindings(new ViewModel)}function googleError(){alert("Google Maps Load Error")}