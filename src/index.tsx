"use client";

import React, { useEffect, useRef } from "react";
import type { ReactDPDPickupMapProps } from "./types";

// NOTE: window.pointSelected is a global callback required by the DPD widget.
// Mounting more than one instance at a time will cause the callbacks to overwrite
// each other, only the last-mounted instance will receive selection events.
declare global {
	interface Window {
		pointSelected: (pointID: string) => void;
	}
}

const boolToInt = (value: boolean): string => (value ? "1" : "0");

export const ReactDPDPickupMap = ({
	authKey,
	onPointSelect,
	lang = "pl",
	country = "PL",
	services = {},
}: ReactDPDPickupMapProps) => {
	// Keep a stable ref so that a new onPointSelect identity does not re-inject the script on every parent render.
	const onPointSelectRef = useRef(onPointSelect);
	useEffect(() => {
		onPointSelectRef.current = onPointSelect;
	}, [onPointSelect]);

	useEffect(() => {
		const container = document.getElementById("dpd-widget-container");
		if (!container) return;

		window.pointSelected = (pointID: string) =>
			onPointSelectRef.current(pointID);

		const queryParams = new URLSearchParams({
			key: authKey,
			lang,
			country,
			open_late: boolToInt(services.openLate ?? false),
			open_saturdays: boolToInt(services.openSaturdays ?? false),
			open_sundays: boolToInt(services.openSundays ?? false),
			disabled_friendly: boolToInt(services.disabledFriendly ?? false),
			parking: boolToInt(services.parking ?? false),
			direct_delivery: boolToInt(services.directDelivery ?? false),
			direct_delivery_cod: boolToInt(services.directDeliveryCOD ?? false),
			dropoff_online: boolToInt(services.dropOffOnline ?? false),
			dropoff_offline: boolToInt(services.dropOffOffline ?? false),
			swap_parcel: boolToInt(services.swapParcel ?? false),
			d_fresh: boolToInt(services.dpdFood ?? false),
			fitting_room: boolToInt(services.fittingRoom ?? false),
			card_payment: boolToInt(services.cardPayment ?? false),
			rod: boolToInt(services.rod ?? false),
			dpd_lq: boolToInt(services.dpdLQ ?? false),
			digital_label: boolToInt(services.digitalLabel ?? false),
			swip_box: boolToInt(services.swipBox ?? false),
			points_with_services: boolToInt(services.pointsWithServices ?? false),
		});

		const script = document.createElement("script");
		script.id = "dpd-widget";
		script.src = `//pudofinder.dpd.com.pl/source/dpd_widget.js?${queryParams}`;
		script.async = true;
		script.onerror = () => {
			console.error("[react-dpd-pickup-map] Failed to load DPD widget script.");
		};

		container.appendChild(script);

		return () => {
			container.removeChild(script);
			delete window.pointSelected;
		};
	}, [authKey, lang, country, services]);

	return <div id="dpd-widget-container" />;
};

export type {
	DPDCountry,
	DPDLang,
	DPDServices,
	ReactDPDPickupMapProps,
} from "./types";
