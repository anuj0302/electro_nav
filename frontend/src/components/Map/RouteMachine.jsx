import { useEffect, useRef } from "react";

import { useMap } from "react-leaflet";

import L from "leaflet";

import "leaflet-routing-machine";

export default function RouteMachine({
  userLocation,
  stationLocation,
  onRouteFound,
}) {
  const map = useMap();

  const routingRef = useRef(null);

  useEffect(() => {
    if (
      !userLocation ||
      !stationLocation
    ) {
      return;
    }

    if (routingRef.current) {
      map.removeControl(
        routingRef.current,
      );
    }

    const control =
      L.Routing.control({
        waypoints: [
          L.latLng(
            userLocation.lat,
            userLocation.lng,
          ),

          L.latLng(
            stationLocation.lat,
            stationLocation.lng,
          ),
        ],

        lineOptions: {
          styles: [
            {
              color: "#22C55E",
              weight: 5,
              opacity: 0.9,
            },
          ],
        },

        addWaypoints: false,

        draggableWaypoints: false,

        routeWhileDragging: false,

        fitSelectedRoutes: false,

        showAlternatives: false,

        createMarker: () => null,

        show: false,

        collapsible: true,
      });

    control.addTo(map);

    const container =
      control.getContainer();

    if (container) {
      container.style.display =
        "none";
    }

    control.on(
      "routesfound",
      (e) => {
        const route =
          e.routes?.[0];

        if (!route) return;

        const distanceKm = (
          route.summary
            .totalDistance / 1000
        ).toFixed(1);

        const timeMins = Math.ceil(
          route.summary.totalTime /
            60,
        );

        onRouteFound?.({
          distanceKm,
          timeMins,
        });
      },
    );

    routingRef.current = control;

    return () => {
      if (routingRef.current) {
        map.removeControl(
          routingRef.current,
        );

        routingRef.current =
          null;
      }
    };
  }, [
    map,
    userLocation?.lat,
    userLocation?.lng,
    stationLocation?.lat,
    stationLocation?.lng,
  ]);

  return null;
}