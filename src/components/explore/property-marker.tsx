"use client";
import { useEffect, useRef } from "react";
import mapboxgl, { type Map } from "mapbox-gl";
import { Property } from "@/types";
import { formatMoney } from "@/utils/formatters";

interface Props {
  property: Property;
  coordinates: [number, number];
  map: Map | null;
}

export function PropertyMarker({ property, coordinates, map }: Props) {
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (!map || !coordinates) return;

    // Crear el popup con información de la propiedad
    const popupContent = `
      <div class="p-2 min-w-[200px]">
        <h3 class="font-semibold text-sm mb-1">${property.nombre}</h3>
        <p class="text-xs text-gray-600 mb-2">${property.direccion}</p>
        <p class="text-sm font-bold text-blue-600">${formatMoney(property.precio)}</p>
        <div class="mt-2 text-xs text-gray-500">
          <span>${property.habitaciones} hab</span> • 
          <span>${property.banios} baños</span> • 
          <span>${property.area}m²</span>
        </div>
      </div>
    `;

    const popup = new mapboxgl.Popup({
      offset: 25,
      closeButton: true,
      closeOnClick: false,
    }).setHTML(popupContent);

    // Crear el marcador con un color distintivo para propiedades
    markerRef.current = new mapboxgl.Marker({
      color: "#3B82F6", // Azul para coincidir con el diseño
      scale: 0.8,
    })
      .setLngLat(coordinates)
      .setPopup(popup)
      .addTo(map);

    // Agregar cursor pointer al marcador
    const markerElement = markerRef.current.getElement();
    markerElement.style.cursor = "pointer";

    // Cleanup
    return () => {
      markerRef.current?.remove();
    };
  }, [map, coordinates, property]);

  return null;
}
