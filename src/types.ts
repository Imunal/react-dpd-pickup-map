export type DPDLang = "pl" | "de" | "se" | "fr";

export type DPDCountry =
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

export interface DPDServices {
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
}

export interface ReactDPDPickupMapProps {
	authKey: string;
	onPointSelect: (pointID: string) => void;
	lang?: DPDLang;
	country?: DPDCountry;
	services?: DPDServices;
}
