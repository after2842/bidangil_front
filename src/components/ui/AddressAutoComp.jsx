"use client";
import React, { useEffect, useState, useRef } from "react";

// We'll form a query, e.g. "123 Main St, Los Angeles, CA"
// from the parent's address object and pass it to getPlacePredictions

export default function AddressSuggestions({ address, setAddress }) {
  const [predictions, setPredictions] = useState([]);
  const sessionTokenRef = useRef(null);

  // If not set, create the session token once
  useEffect(() => {
    if (!sessionTokenRef.current) {
      sessionTokenRef.current =
        new google.maps.places.AutocompleteSessionToken();
    }
  }, []);

  // Build a string from addressLine1 + city + state
  const partialAddress = `${address.addressLine1}${address.city ? `, ${address.city}` : ""}${
    address.state ? `, ${address.state}` : ""
  }`;

  // fetch predictions whenever partialAddress changes
  useEffect(() => {
    if (!partialAddress.trim()) {
      setPredictions([]);
      return;
    }

    const service = new google.maps.places.AutocompleteService();
    service.getPlacePredictions(
      {
        input: partialAddress,
        sessionToken: sessionTokenRef.current,
      },
      (result, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && result) {
          setPredictions(result);
        } else {
          setPredictions([]);
        }
      }
    );
  }, [partialAddress]);

  const handleSelectPrediction = (prediction) => {
    // we want to get place details: street_number, route, city, state, zip, country
    const placesService = new google.maps.places.PlacesService(
      document.createElement("div")
    );
    placesService.getDetails(
      {
        placeId: prediction.place_id,
        fields: ["address_components", "formatted_address"],
        sessionToken: sessionTokenRef.current,
      },
      (place, psStatus) => {
        if (
          psStatus === google.maps.places.PlacesServiceStatus.OK &&
          place?.address_components
        ) {
          const updated = { ...address };
          updated.addressLine1 = "";
          updated.addressLine2 = "";
          updated.city = "";
          updated.state = "";
          updated.zip = "";
          for (const component of place.address_components) {
            const types = component.types;
            if (types.includes("street_number")) {
              if (!updated.addressLine1) {
                updated.addressLine1 = component.long_name;
              } else {
                updated.addressLine1 =
                  component.long_name + " " + updated.addressLine1;
              }
            }
            if (types.includes("route")) {
              if (!updated.addressLine1) {
                updated.addressLine1 = component.long_name;
              } else {
                updated.addressLine1 += " " + component.long_name;
              }
            }
            if (types.includes("locality")) {
              updated.city = component.long_name;
            }
            if (types.includes("administrative_area_level_1")) {
              updated.state = component.short_name; // e.g. CA
            }
            if (types.includes("postal_code")) {
              updated.zip = component.long_name;
            }
            if (types.includes("country")) {
              updated.country = component.long_name;
            }
          }
          setAddress(updated);
          setPredictions([]); // hide suggestions
        }
      }
    );
  };

  if (predictions.length === 0) {
    return null; // no suggestions, render nothing
  }

  return (
    <div>
      <div className="mt-12 text-sm text-left ml-2">
        <h>주소 자동완성</h>
      </div>
      <div className=" bg-transparent w-full max-w-md mt-2 rounded-xl px-1">
        {predictions.map((item) => (
          <div
            key={item.place_id}
            className="px-2 py-[3px] mb-1 bg-white hover:bg-gray-200 shadow-sm cursor-pointer rounded-lg text-left"
            onClick={() => handleSelectPrediction(item)}
          >
            {item.description}
          </div>
        ))}
      </div>{" "}
    </div>
  );
}
