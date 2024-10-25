document.addEventListener('DOMContentLoaded', () => {
    const locationElement = document.getElementById('location');
  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      locationElement.innerHTML = "Geolocation is not supported";
    }
  
    function showPosition(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
  
      // Fetch the location using a Geolocation API or Google Maps API
      fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)
        .then(response => response.json())
        .then(data => {
          const location = data.address.city || data.address.town || "Location Unknown";
          locationElement.innerHTML = location;
        })
        .catch(error => {
          console.error('Error fetching location:', error);
          locationElement.innerHTML = "Location Unavailable";
        });
    }
  
    function showError(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          locationElement.innerHTML = "Location access denied";
          break;
        case error.POSITION_UNAVAILABLE:
          locationElement.innerHTML = "Location unavailable";
          break;
        case error.TIMEOUT:
          locationElement.innerHTML = "Location request timed out";
          break;
        case error.UNKNOWN_ERROR:
          locationElement.innerHTML = "An unknown error occurred";
          break;
      }
    }
  });
  