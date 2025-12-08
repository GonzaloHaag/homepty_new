"use client";
import { useEffect, useRef, useState } from "react";
import mapboxgl, { type MapMouseEvent } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Marker } from "./marker";
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
export function Map() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [markers, setMarkers] = useState<
    { id: string; coordinates: [number, number] }[]
  >([]);
  function onMapClick(event: MapMouseEvent) {
    console.log("Map clicked at: ", event.lngLat);
    setMarkers((prevMarkers) => [
      ...prevMarkers,
      {
        id: Date.now().toString(),
        coordinates: [event.lngLat.lng, event.lngLat.lat],
      },
    ]);
  }
  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current as HTMLElement,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-99.11616654440547, 19.445704307579696], // Longitud, Latitud de México city
      zoom: 9,
    });

    mapRef.current.on("load", () => {
      mapRef.current?.on("click", onMapClick);
      setMap(mapRef.current);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  const removeMarker = (id: string) => {
    setMarkers((prevMarkers) =>
      prevMarkers.filter((marker) => marker.id !== id)
    );
  };

  return (
    <>
      <div id="map-container" className="w-full h-full" ref={mapContainerRef} />
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          lngLat={marker.coordinates}
          map={map}
          onRemove={() => removeMarker(marker.id)}
        />
      ))}
    </>
  );
}
