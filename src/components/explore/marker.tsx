"use client";
import { useEffect } from "react";
import mapboxgl, { type Map } from "mapbox-gl";

interface Props {
  lngLat: [number, number];
  map: Map | null;
  onRemove: () => void;
}
export function Marker({ lngLat, map, onRemove }: Props) {
  useEffect(() => {
    if (!map) return;

    const marker = new mapboxgl.Marker({ color: "red" })
      .setLngLat(lngLat)
      .addTo(map);

    const markerElement = marker.getElement();
    markerElement.style.cursor = "";
    
    markerElement.addEventListener("click", (e) => {
      e.stopPropagation();
      onRemove();
    });

    return () => {
      marker.remove();
    };
  }, [map, lngLat]);

  return null;
}
