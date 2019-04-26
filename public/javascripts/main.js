const directionsService = new google.maps.DirectionsService();
const directionsDisplay = new google.maps.DirectionsRenderer();

function startMap(myLoc) {
  const map = new google.maps.Map(
    document.getElementById('map'),
    {
      zoom: 11,
      center: {
        lat: -23.547648,
        lng: -46.632806,
      },
    },
  );

  const myHouse = new google.maps.Marker({
    position: {
      lat: -23.485879,
      lng: -46.642822,
    },
    map,
    title: 'Home',
  });

  const whereAmI = new google.maps.Marker({
    position: myLoc,
    map,
    title: 'Where I am',
  });

  const directionRequest = {
    origin: myLoc,
    destination: {
      lat: -23.485879,
      lng: -46.642822,
    },
    travelMode: 'TRANSIT',
  };

  directionsService.route(
    directionRequest,
    (response, status) => {
      if (status === 'OK') {
        // everything is ok
        directionsDisplay.setDirections(response);
      } else {
        // something went wrong
        window.alert(`Directions request failed due to ${  status}`);
      }
    },
  );

  directionsDisplay.setMap(map);
}

function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const myLoc = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      startMap(myLoc);
    }, () => {
      console.log('Error in the geolocation service.');
    });
  } else {
    console.log('Browser does not support geolocation.');
  }
}

getUserLocation();
