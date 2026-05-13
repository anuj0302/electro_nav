import { useEffect } from "react";

import { useMap } from "react-leaflet";

export default function FlyToLocation({ center, zoom = 15 }) {
  const map = useMap();

  useEffect(() => {
    if (!center) return;

    map.flyTo([center.lat, center.lng], zoom, {
      duration: 1.4,
    });
  }, [center, map, zoom]);

  return null;
}
