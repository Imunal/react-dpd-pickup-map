"use client";

import React, { useEffect } from "react";

//Type window
declare const window: Window &
  typeof globalThis & {
    pointSelected: (pointID: string) => void;
  };

//Interface
interface IReactDPDPickupMap {
  authKey: string;
  onPointSelect: (pointID: string) => void;
  lang: "pl" | "de" | "se" | "fr";
  country:
    | "AT"
    | "BE"
    | "HR"
    | "CZ"
    | "DK"
    | "EE"
    | "FI"
    | "FR"
    | "ES"
    | "NL"
    | "LT"
    | "LV"
    | "DE"
    | "PT"
    | "SK"
    | "SE"
    | "HU"
    | "IT"
    | "PL";
  services?: {
    openLate?: boolean;
    openSaturdays?: boolean;
    openSundays?: boolean;
    disabledFriendly?: boolean;
    parking?: boolean;
    directDelivery?: boolean;
    directDeliveryCOD?: boolean;
    dropOffOnline?: boolean;
    dropOffOffline?: boolean;
    swapParcel?: boolean;
    dpdFood?: boolean;
    fittingRoom?: boolean;
    cardPayment?: boolean;
    rod?: boolean;
    dpdLQ?: boolean;
    digitalLabel?: boolean;
    swipBox?: boolean;
    pointsWithServices?: boolean;
  };
}

//Helper convert boolean to pseudo int
const boolToInt = (value: boolean): string => (value ? "1" : "0");

export const ReactDPDPickupMap = ({
  authKey,
  onPointSelect,
  lang = "pl",
  country = "PL",
  services = {},
}: IReactDPDPickupMap) => {
  useEffect(() => {
    //Make sure that element exist before mounting it.
    const container = document.getElementById("dpd-widget-container");
    if (!container) return;

    //Handle point selection.
    window.pointSelected = (pointID: string) => onPointSelect(pointID);

    //Create query param
    const queryParams = new URLSearchParams({
      key: authKey,
      lang,
      country,
      //Map
      open_late: boolToInt(services.openLate || false),
      open_saturdays: boolToInt(services.openSaturdays || false),
      open_sundays: boolToInt(services.openSundays || false),
      disabled_friendly: boolToInt(services.disabledFriendly || false),
      parking: boolToInt(services.parking || false),
      direct_delivery: boolToInt(services.directDelivery || false),
      direct_delivery_cod: boolToInt(services.directDeliveryCOD || false),
      dropoff_online: boolToInt(services.dropOffOnline || false),
      dropoff_offline: boolToInt(services.dropOffOffline || false),
      swap_parcel: boolToInt(services.swapParcel || false),
      d_fresh: boolToInt(services.dpdFood || false),
      fitting_room: boolToInt(services.fittingRoom || false),
      card_payment: boolToInt(services.cardPayment || false),
      rod: boolToInt(services.rod || false),
      dpd_lq: boolToInt(services.dpdLQ || false),
      digital_label: boolToInt(services.digitalLabel || false),
      swip_box: boolToInt(services.swipBox || false),
      points_with_services: boolToInt(services.pointsWithServices || false),
    });

    //Create script element
    const script = document.createElement("script");
    script.id = "dpd-widget";
    script.src = `//pudofinder.dpd.com.pl/source/dpd_widget.js?${queryParams}`;
    script.async = true;

    //Append element
    document.body.appendChild(script);

    //Cleanup
    return () => {
      document.body.removeChild(script);
      delete window.pointSelected;
    };
  }, [authKey, onPointSelect, lang, country, services]);

  return (
    <div id="dpd-widget-container">
      <script id="dpd-widget"></script>
    </div>
  );
};
