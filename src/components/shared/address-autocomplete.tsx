"use client";
import { type ReactNode } from "react";
import { AddressAutofill } from "@mapbox/search-js-react";

export default function AddressAutoComplete({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <AddressAutofill
      accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!}
      options={{ language: "es", country: "MX" }}
    >
      {children}
    </AddressAutofill>
  );
}
