var map;
var infoWindow;
var image = 'doce.png';
var you = 'you.png';
var already = 'already.png';
function initMap() {
   var mapOptions = {
     center: new google.maps.LatLng(-32.0332,-52.0986),
      zoom: 16,
      mapTypeId: 'roadmap',
   };
   map = new google.maps.Map(document.getElementById('map'), mapOptions);
   infoWindow = new google.maps.InfoWindow({
     map: map,
     maxWidth: 250
   });
    google.maps.event.addListener(map, 'click', function() {
     infoWindow.close();
   });
   if (window.navigator && window.navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(function(position) {
       var pos = {
         lat: position.coords.latitude,
         lng: position.coords.longitude
       };
       map.setCenter(pos);
       var voce = pos;
       var marker = new google.maps.Marker({
         position: voce,
         map: map,
         draggable: false,
         icon:you,
         animation: google.maps.Animation.BOUNCE
       });
      var service = new google.maps.places.PlacesService(map);
      service.nearbySearch({
        location: voce,
        radius: 900,
        types: ['cafe','food','bakery','restaurant']
      }, callback);
      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
         results.forEach(createMarker);
        }
      }
      //criação de marcadores
      var lugar = []; //Vetor que armazena os lugares que a pessoa já foi.
      function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          name: place.name,
          icon: image,
          position: place.geometry.location,
          animation: google.maps.Animation.DROP
        });

        google.maps.event.addListener(marker, 'click', function() {
          var request = {
              reference: place.reference
          };
          service.getDetails(request, function(details, status) {
            console.log(details);
            var info = 'Nome: '+details.name+'</br>Endereço: '+details.vicinity+
            '</br>Telefone: '+details.formatted_phone_number+'</br>Nota: '+details.rating+
            '</br>Funcionamento:</br>'+details.opening_hours.weekday_text.join('</br>');
            infoWindow.setContent(info);
            infoWindow.open(map, marker);
          });
        });

        google.maps.event.addListener(marker, 'dblclick', function() {
          if (marker.icon === 'doce.png') {
            lugar.push(marker.name);
            marker.setIcon('already.png');
          }else{
            Array.prototype.remove = function(start, end) {
              lugar.splice(position, 1);
              return lugar;
            }
            var position = lugar.indexOf(marker.name);
            lugar.remove(marker.name);
            marker.setIcon('doce.png');
          }
          localStorage.setItem("lugar", JSON.stringify(lugar));
        });
    }
    }, function() {
       handleLocationError(true, infoWindow, map.getCenter());
     });
   } else {
     handleLocationError(false, infoWindow, map.getCenter());
   }
   //Sem permissão
   function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        var alert = document.getElementById('alert').style.display="inherit";
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: O serviço de geolocalização falhou.' :
                              'Error: Seu browser não suporta a geolocalização.');
    }

}
