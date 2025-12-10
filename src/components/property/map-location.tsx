"use client";
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface Props {
  address?: string;
  coordinates?: [number, number]; // [longitude, latitude]
}

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

export function MapLocation({ address, coordinates }: Props) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  
  // Coordenadas por defecto (Ciudad de México)
  const defaultCoordinates: [number, number] = [-99.11616654440547, 19.445704307579696];
  const location = coordinates || defaultCoordinates;

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Inicializar el mapa
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: location,
      zoom: 15,
    });

    // Agregar controles de navegación
    mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Agregar el marcador cuando el mapa esté listo
    mapRef.current.on("load", () => {
      if (mapRef.current) {
        markerRef.current = new mapboxgl.Marker({
          color: "#3B82F6", // Color azul similar a la imagen
        })
          .setLngLat(location)
          .addTo(mapRef.current);
      }
    });

    // Cleanup
    return () => {
      markerRef.current?.remove();
      mapRef.current?.remove();
    };
  }, [location]);

  // Actualizar la posición del marcador si cambian las coordenadas
  useEffect(() => {
    if (mapRef.current && markerRef.current) {
      markerRef.current.setLngLat(location);
      mapRef.current.flyTo({
        center: location,
        zoom: 15,
      });
    }
  }, [location]);

  return (
    <div className="w-full h-full flex flex-col">
      {address && (
        <div className="p-4 bg-card border-b">
          <div className="flex items-start gap-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary mt-0.5 shrink-0"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <div className="flex flex-col gap-y-1">
              <h4 className="font-semibold text-sm">Ubicación</h4>
              <p className="text-sm text-muted-foreground">{address}</p>
            </div>
          </div>
        </div>
      )}
      <div className="flex-1 min-h-[400px]" ref={mapContainerRef} />
    </div>
  );
}
