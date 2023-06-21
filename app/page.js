"use client";

import React, { useState } from "react";
import { useMemo } from "react";
import { GoogleMap, useLoadScript, Autocomplete } from "@react-google-maps/api";
import "./page.css";

const libraries = ["places"];

export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDHfdBmUpWupA3f4Ld0lNTuQbbJQGJ4CSo",
    libraries: libraries,
    region: "NG",
    // When billing is enabled on GCP use the line of code below
    // googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_KEYS,
  });

  const [origin, setOrigin] = useState("");
  const [autocomplete, setAutocomplete] = useState(null);

  const handlePlaceChanged = () => {
    if (autocomplete) {
      autocomplete.getPlacePredictions(
        {
          input: origin,
          componentRestrictions: { country: "ng" },
          bounds: {
            east: 14.677,
            west: 2.6769,
            north: 13.8927,
            south: 4.2679,
          },
        },
        (predictions, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            if (predictions.length > 0) {
              const place = predictions[0];
              setOrigin(place.description);
            } else {
              setOrigin("");
            }
          } else {
            setOrigin("");
          }
        }
      );
    }
  };

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <Map
      origin={origin}
      setOrigin={setOrigin}
      setAutocomplete={setAutocomplete}
    />
  );
}

function Map({ origin, setOrigin, handlePlaceChanged }) {
  const center = useMemo(() => ({ lat: 6.5244, lng: 3.3792 }), []);

  return (
    <GoogleMap zoom={12} center={center} mapContainerClassName="map-container">
      <div className="input-container">
        <Autocomplete
          onLoad={(autoOrigin) => setOrigin(autoOrigin)}
          onPlaceChanged={handlePlaceChanged}
        >
          <input
            type="text"
            placeholder="Enter your address"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            onBlur={handlePlaceChanged}
          />
        </Autocomplete>
      </div>
    </GoogleMap>
  );
}

// AIzaSyDHfdBmUpWupA3f4Ld0lNTuQbbJQGJ4CSo;
