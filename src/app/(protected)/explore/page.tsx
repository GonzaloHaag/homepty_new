import { Map, PropertyCard, SectionFilters } from "@/components/explore";
const properties = [
  {
    id: "1",
    title: "Departamento con vista panorámica",
    location: "La Antigua, Veracruz",
    price: 328000,
    area: 200,
    bedrooms: 3,
    bathrooms: 2,
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=80",
  },
  {
    id: "2",
    title: "Casa premium en zona residencial",
    location: "Playa del Carmen, Q. Roo",
    price: 450000,
    area: 350,
    bedrooms: 4,
    bathrooms: 3,
    image:
      "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?w=400&q=80",
  },
  {
    id: "3",
    title: "Penthouse en zona céntrica",
    location: "Mérida, Yucatán",
    price: 890000,
    area: 500,
    bedrooms: 5,
    bathrooms: 4,
    image:
      "https://images.unsplash.com/photo-1602585990040-4ec1ae11fec9?w=400&q=80",
  },
  {
    id: "4",
    title: "Apartamento moderno",
    location: "Celaya, Guanajuato",
    price: 275000,
    area: 120,
    bedrooms: 2,
    bathrooms: 1,
    image:
      "https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?w=400&q=80",
  },
  {
    id: "5",
    title: "Casa en fraccionamiento",
    location: "Querétaro, Querétaro",
    price: 520000,
    area: 280,
    bedrooms: 3,
    bathrooms: 2,
    image:
      "https://images.unsplash.com/photo-1470058869958-2a77ade41c02?w=400&q=80",
  },
];

export default async function ExplorePage() {
  return (
    <div className="flex flex-col gap-y-4">
      <SectionFilters />
      <div className="grid grid-cols-3">
        <div className="col-span-2 w-full min-h-[500px]">
          <Map />
        </div>
        <aside className="col-span-1 w-full flex flex-col gap-y-4 p-2 border border-gray-200 overflow-y-auto max-h-[500px]">
          {/* Aquí irán los resultados de las propiedades */}
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </aside>
      </div>
    </div>
  );
}
