// src/utils/mapHelpers.js

/* ---------------- OPEN GOOGLE MAPS NAVIGATION ---------------- */

export const openNavigation = (
  lat,
  lng
) => {
  if (!lat || !lng) return;

  const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  window.open(
    url,
    "_blank"
  );
};

/* ---------------- CALCULATE DISTANCE ---------------- */

export const calculateDistance = (
  lat1,
  lon1,
  lat2,
  lon2
) => {
  const toRad = (value) => 
    (value * Math.PI) / 180;

  const R = 6371;

  const dLat = toRad(
    lat2 - lat1
  );

  const dLon = toRad(
    lon2 - lon1
  );

  const a =
    Math.sin(dLat / 2) *
      Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return (R * c).toFixed(1);
};

/* ---------------- FORMAT DISTANCE ---------------- */

export const formatDistance = (
  distance
) => {
  if (!distance)
    return "Nearby";

  return `${distance} km`;
};

/* ---------------- GET USER LOCATION ---------------- */

export const getUserLocation =
  () => {
    return new Promise(
      (resolve, reject) => {
        if (
          !navigator.geolocation
        ) {
          reject(
            new Error(
              "Geolocation not supported"
            )
          );

          return;
        }

        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,

              lng: position.coords.longitude,
            });
          },

          (error) => {
            reject(error);
          },

          {
            enableHighAccuracy: true,

            timeout: 10000,

            maximumAge: 0,
          }
        );
      }
    );
  };

/* ---------------- SORT STATIONS BY DISTANCE ---------------- */

export const sortStationsByDistance =
  (
    stations = [],
    userLocation
  ) => {
    if (!userLocation)
      return stations;

    return [...stations].sort(
      (a, b) => {
        const distA =
          calculateDistance(
            userLocation.lat,
            userLocation.lng,

            a?.location?.lat,
            a?.location?.lng
          );

        const distB =
          calculateDistance(
            userLocation.lat,
            userLocation.lng,

            b?.location?.lat,
            b?.location?.lng
          );

        return distA - distB;
      }
    );
  };