"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { PropertyType } from "@/types";
import { MapPin, Navigation, Map as MapIcon, School, Coffee, ShoppingBag, Truck, Stethoscope } from "lucide-react";

interface Props {
  address?: string;
  coordinates?: [number, number]; // [longitude, latitude]
  propertyType: PropertyType;
}

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

// https://docs.mapbox.com/api/search/search-box/#category-search
const MAPBOX_SEARCH_URL = "https://api.mapbox.com/search/searchbox/v1/category/";

interface PoiResult {
  mapbox_id: string;
  name: string;
  distance: number;
  full_address?: string;
  coordinates: [number, number];
}

interface CategoryGroup {
  id: string;
  label: string;
  mapboxCategory: string; // The category string expected by Mapbox API
  icon: React.ReactNode;
}

export function EnvironmentMap({ address, coordinates, propertyType }: Props) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mainMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const poiMarkersRef = useRef<mapboxgl.Marker[]>([]);

  // Default coords (CDMX)
  const defaultCoordinates: [number, number] = [-99.11616654440547, 19.445704307579696];
  
  // Verify coordinates are valid numbers, otherwise use default
  const hasValidCoordinates = coordinates && 
    Array.isArray(coordinates) && 
    coordinates.length === 2 && 
    typeof coordinates[0] === 'number' && !isNaN(coordinates[0]) &&
    typeof coordinates[1] === 'number' && !isNaN(coordinates[1]);
    
  const location = hasValidCoordinates ? coordinates : defaultCoordinates;

  const [isLoading, setIsLoading] = useState(false);
  const [poiResults, setPoiResults] = useState<PoiResult[]>([]);
  const [activeTab, setActiveTab] = useState<string>("education");

  // Determine property general taxonomy based on PropertyType
  const taxonomyGroups = useMemo(() => {
    const isCommercial = [
      "Local comercial", "Plaza comercial", "Centro comercial", "Restaurante", 
      "Dark kitchen", "Oficina corporativa", "Coworking / Flex", "Consultorio"
    ].includes(propertyType);
    
    const isIndustrial = [
      "Bodega logística", "Centro de distribución", "Nave industrial", "Parque industrial", "Terreno industrial"
    ].includes(propertyType);

    // Default is residential / general
    let tabs: CategoryGroup[] = [
      { id: "education", label: "Escuelas", mapboxCategory: "school,university,college", icon: <School className="w-4 h-4" /> },
      { id: "health", label: "Hospitales", mapboxCategory: "hospital,clinic", icon: <Stethoscope className="w-4 h-4" /> },
      { id: "grocery", label: "Súper", mapboxCategory: "supermarket,grocery", icon: <ShoppingBag className="w-4 h-4" /> },
      { id: "transit", label: "Transporte", mapboxCategory: "transit,bus_station,train_station", icon: <Navigation className="w-4 h-4" /> },
    ];

    if (isCommercial) {
      tabs = [
        { id: "food", label: "Comida", mapboxCategory: "restaurant,cafe", icon: <Coffee className="w-4 h-4" /> },
        { id: "parking", label: "Estacionamiento", mapboxCategory: "parking", icon: <MapPin className="w-4 h-4" /> },
        { id: "transit", label: "Transporte", mapboxCategory: "transit,bus_station,train_station", icon: <Navigation className="w-4 h-4" /> },
      ];
      setActiveTab("food");
    } else if (isIndustrial) {
      tabs = [
        { id: "gas", label: "Gasolineras", mapboxCategory: "gas_station", icon: <Truck className="w-4 h-4" /> },
        { id: "food", label: "Comida rápida", mapboxCategory: "restaurant,fast_food", icon: <Coffee className="w-4 h-4" /> },
        { id: "transit", label: "Transporte", mapboxCategory: "transit,bus_station", icon: <Navigation className="w-4 h-4" /> },
      ];
      setActiveTab("gas");
    }

    return tabs;
  }, [propertyType]);

  const activeCategoryGroup = taxonomyGroups.find(t => t.id === activeTab) || taxonomyGroups[0];

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: location,
      zoom: 14,
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    mapRef.current.on("load", () => {
      if (mapRef.current) {
        mainMarkerRef.current = new mapboxgl.Marker({
          color: "#0f172a", // Dark accent for main property
        })
          .setLngLat(location)
          .addTo(mapRef.current);
      }
    });

    return () => {
      mainMarkerRef.current?.remove();
      poiMarkersRef.current.forEach(marker => marker.remove());
      mapRef.current?.remove();
    };
  }, [location[0], location[1]]);

  // Fetch POIs when tab changes or location changes
  useEffect(() => {
    const fetchPois = async () => {
      if (!location) return;
      setIsLoading(true);
      
      try {
        const url = `${MAPBOX_SEARCH_URL}${activeCategoryGroup.mapboxCategory}?proximity=${location[0]},${location[1]}&access_token=${mapboxgl.accessToken}&limit=10`;
        const res = await fetch(url);
        const data = await res.json();
        
        if (data && data.features) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const parsedResults: PoiResult[] = data.features.map((f: any) => ({
            mapbox_id: f.properties.mapbox_id,
            name: f.properties.name,
            distance: f.properties.distance,
            full_address: f.properties.full_address,
            coordinates: f.geometry.coordinates as [number, number],
          }));

          setPoiResults(parsedResults);
        }
      } catch (err) {
        console.error("Error fetching Mapbox POIs", err);
        setPoiResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPois();
  }, [activeCategoryGroup, location[0], location[1]]);

  // Update POI markers
  useEffect(() => {
    if (!mapRef.current) return;

    // Remove old POI markers
    poiMarkersRef.current.forEach(m => m.remove());
    poiMarkersRef.current = [];

    // Add new POI markers
    poiResults.forEach(poi => {
      const el = document.createElement('div');
      el.className = 'w-4 h-4 bg-primary rounded-full border-2 border-white shadow-md';

      const popup = new mapboxgl.Popup({ offset: 15 }).setHTML(`
        <div class="px-2 py-1">
          <p class="font-bold text-sm">${poi.name}</p>
          <p class="text-xs text-muted-foreground">${(poi.distance / 1000).toFixed(1)} km</p>
        </div>
      `);

      const marker = new mapboxgl.Marker(el)
        .setLngLat(poi.coordinates)
        .setPopup(popup)
        .addTo(mapRef.current!);

      poiMarkersRef.current.push(marker);
    });

    // Optionally fit bounds to include some markers if there's enough results
  }, [poiResults]);

  const handleFlyToPoi = (coords: [number, number]) => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: coords,
        zoom: 15,
        essential: true 
      });
    }
  };

  return (
    <div className="flex flex-col border border-border rounded-xl overflow-hidden bg-card w-full h-full">
      <div className="p-4 border-b border-border bg-slate-50 flex items-center gap-x-3">
        <MapIcon className="text-primary w-5 h-5 shrink-0" />
        <div>
          <h4 className="font-semibold text-sm">Entorno y Conectividad</h4>
          <p className="text-xs text-muted-foreground">Explora puntos de interés cercanos a la propiedad</p>
        </div>
      </div>
      
      {/* Map Container (Top) */}
      <div className="w-full relative h-[300px] shrink-0 bg-slate-100" ref={mapContainerRef} />

      {/* Search Tabs (Middle) */}
      <div className="flex px-4 pt-3 bg-white border-b border-border overflow-x-auto no-scrollbar shrink-0">
        {taxonomyGroups.map((group) => (
          <button
            key={group.id}
            onClick={() => setActiveTab(group.id)}
            className={`flex items-center gap-x-2 px-4 py-2.5 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
              activeTab === group.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            {group.icon}
            {group.label}
          </button>
        ))}
      </div>

      {/* Poi List (Bottom) */}
      <div className="flex-1 w-full overflow-y-auto bg-white">
        {isLoading ? (
          <div className="p-8 flex justify-center items-center h-full">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : poiResults.length === 0 ? (
          <div className="p-8 flex flex-col items-center justify-center h-full text-center">
            <MapPin className="w-8 h-8 text-muted-foreground/30 mb-2" />
            <p className="text-sm text-muted-foreground">No se encontraron resultados cercanos.</p>
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {poiResults.map(poi => (
              <li 
                key={poi.mapbox_id} 
                className="p-4 hover:bg-slate-50 cursor-pointer transition-colors flex flex-col gap-1"
                onClick={() => handleFlyToPoi(poi.coordinates)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                       {activeCategoryGroup.icon}
                    </div>
                    <p className="text-sm font-medium line-clamp-1" title={poi.name}>{poi.name}</p>
                  </div>
                  <span className="font-semibold text-xs whitespace-nowrap text-slate-700 bg-slate-100 px-2 py-1 rounded-md">
                    {(poi.distance / 1000).toFixed(1)} km
                  </span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1 ml-11">{poi.full_address || "Cerca del área"}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
