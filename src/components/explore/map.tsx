"use client";
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
export function Map() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  useEffect(() => {
    console.log("Map component mounted");
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current as HTMLElement,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-99.11616654440547, 19.445704307579696], // Longitud, Latitud de México city
      zoom: 9,
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);
  return <div id="map-container" className="w-full h-full" ref={mapContainerRef}></div>;
}
