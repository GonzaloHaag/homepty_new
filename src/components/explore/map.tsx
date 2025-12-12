"use client";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { PropertyWithLocation } from "@/types";
import { PropertyMarker } from "./property-marker";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

interface Props {
  properties: PropertyWithLocation[];
}

export function Map({ properties }: Props) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [propertiesWithCoords, setPropertiesWithCoords] = useState<
    PropertyWithLocation[]
  >([]);
  const [failedGeocoding, setFailedGeocoding] = useState<number>(0);

  // Función para geocodificar una dirección usando Mapbox Geocoding API
  const geocodeAddress = async (
    address: string,
    propertyName: string
  ): Promise<[number, number] | null> => {
    try {
      const encodedAddress = encodeURIComponent(address);
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${mapboxgl.accessToken}&country=MX&limit=1`
      );

      if (!response.ok) {
        console.warn(`⚠️ Geocoding falló para "${propertyName}": ${response.statusText}`);
        return null;
      }

      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        console.log(`✅ Ubicación encontrada para "${propertyName}": [${lng}, ${lat}]`);
        return [lng, lat];
      }

      console.warn(`⚠️ No se encontró ubicación para "${propertyName}" - Dirección: ${address}`);
      return null;
    } catch (error) {
      console.error(`❌ Error geocodificando "${propertyName}":`, error);
      return null;
    }
  };

  // Geocodificar propiedades cuando cambien
  useEffect(() => {
    const geocodeProperties = async () => {
      let failedCount = 0;

      const propertiesWithCoordinates = await Promise.all(
        properties.map(async (property) => {
          // Si ya tiene coordenadas, retornarla tal cual
          if (property.coordinates) {
            return property;
          }

          // Geocodificar la dirección
          const fullAddress = `${property.direccion}, ${property.colonia || ""}, ${property.codigo_postal || ""}`;
          const coordinates = await geocodeAddress(fullAddress, property.nombre);

          if (!coordinates) {
            failedCount++;
          }

          return {
            ...property,
            coordinates: coordinates || undefined,
          };
        })
      );

      // Filtrar solo las propiedades con coordenadas válidas
      const validProperties = propertiesWithCoordinates.filter(
        (p) => p.coordinates !== undefined
      ) as PropertyWithLocation[];

      setPropertiesWithCoords(validProperties);
      setFailedGeocoding(failedCount);

      // Log del resumen
      if (failedCount > 0) {
        console.warn(
          "📍 Resumen de geocodificación:\n" +
          `   ✅ Éxito: ${validProperties.length}/${properties.length} propiedades\n` +
          `   ⚠️ Fallidas: ${failedCount}/${properties.length} propiedades\n` +
          "   💡 Revisa las direcciones de las propiedades que fallaron arriba"
        );
      } else {
        console.log(`✅ Todas las propiedades (${validProperties.length}) fueron geocodificadas exitosamente`);
      }
    };

    if (properties.length > 0) {
      geocodeProperties();
    }
  }, [properties]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-99.11616654440547, 19.445704307579696], // Ciudad de México
      zoom: 11,
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    mapRef.current.on("load", () => {
      setMap(mapRef.current);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  // Ajustar el mapa para mostrar todas las propiedades
  useEffect(() => {
    if (map && propertiesWithCoords.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();

      propertiesWithCoords.forEach((property) => {
        if (property.coordinates) {
          bounds.extend(property.coordinates);
        }
      });

      map.fitBounds(bounds, {
        padding: { top: 50, bottom: 50, left: 50, right: 350 }, // Right padding para el aside
        maxZoom: 15,
      });
    }
  }, [map, propertiesWithCoords]);

  return (
    <div className="relative w-full h-full">
      <div id="map-container" className="w-full h-full" ref={mapContainerRef} />
      
      {/* Alerta de geocodificación fallida */}
      {failedGeocoding > 0 && (
        <div className="absolute top-4 left-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3 shadow-md max-w-sm z-10">
          <div className="flex items-start gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <p className="text-sm font-medium text-yellow-800">
                {failedGeocoding} {failedGeocoding === 1 ? "propiedad" : "propiedades"} sin ubicación
              </p>
              <p className="text-xs text-yellow-700 mt-1">
                No se pudieron geocodificar algunas direcciones. Revisa la consola para más detalles.
              </p>
            </div>
          </div>
        </div>
      )}

      {propertiesWithCoords.map((property) => (
        <PropertyMarker
          key={property.id}
          property={property}
          coordinates={property.coordinates!}
          map={map}
        />
      ))}
    </div>
  );
}
