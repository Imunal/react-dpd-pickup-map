import { cleanup, render } from "@testing-library/react";
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ReactDPDPickupMap } from "../src";

afterEach(() => {
	cleanup();
	delete (window as any).pointSelected;
});

describe("ReactDPDPickupMap", () => {
	describe("rendering", () => {
		it("renders the widget container div", () => {
			// given
			// when
			render(<ReactDPDPickupMap authKey="test-key" onPointSelect={() => {}} />);

			// then
			expect(
				document.getElementById("dpd-widget-container"),
			).toBeInTheDocument();
		});
	});

	describe("script injection", () => {
		it("appends a script tag inside the container on mount", () => {
			// given
			// when
			render(<ReactDPDPickupMap authKey="test-key" onPointSelect={() => {}} />);

			// then
			const widgetContainer = document.getElementById("dpd-widget-container");
			expect(
				widgetContainer?.querySelector("script#dpd-widget"),
			).toBeInTheDocument();
		});

		it("builds the correct script src with authKey, lang and country", () => {
			// given
			// when
			render(
				<ReactDPDPickupMap
					authKey="my-auth-key"
					onPointSelect={() => {}}
					lang="de"
					country="DE"
				/>,
			);

			// then
			const script = document
				.getElementById("dpd-widget-container")
				?.querySelector<HTMLScriptElement>("script#dpd-widget");

			expect(script?.src).toContain("key=my-auth-key");
			expect(script?.src).toContain("lang=de");
			expect(script?.src).toContain("country=DE");
		});

		it("encodes enabled service flags as 1 and disabled as 0 in the script src", () => {
			// given
			// when
			render(
				<ReactDPDPickupMap
					authKey="key"
					onPointSelect={() => {}}
					services={{ openLate: true, parking: false }}
				/>,
			);

			// then
			const script = document
				.getElementById("dpd-widget-container")
				?.querySelector<HTMLScriptElement>("script#dpd-widget");

			expect(script?.src).toContain("open_late=1");
			expect(script?.src).toContain("parking=0");
		});

		it("re-injects the script when authKey changes", () => {
			// given
			const { rerender } = render(
				<ReactDPDPickupMap authKey="key-v1" onPointSelect={() => {}} />,
			);

			// when
			rerender(<ReactDPDPickupMap authKey="key-v2" onPointSelect={() => {}} />);

			// then
			const script = document
				.getElementById("dpd-widget-container")
				?.querySelector<HTMLScriptElement>("script#dpd-widget");

			expect(script?.src).toContain("key=key-v2");
		});
	});

	describe("callback bridge", () => {
		it("sets window.pointSelected on mount", () => {
			// given
			// when
			render(<ReactDPDPickupMap authKey="key" onPointSelect={() => {}} />);

			// then
			expect(typeof window.pointSelected).toBe("function");
		});

		it("calls onPointSelect when the DPD widget invokes window.pointSelected", () => {
			// given
			const onPointSelect = vi.fn();
			render(<ReactDPDPickupMap authKey="key" onPointSelect={onPointSelect} />);

			// when
			window.pointSelected("POINT123");

			// then
			expect(onPointSelect).toHaveBeenCalledOnce();
			expect(onPointSelect).toHaveBeenCalledWith("POINT123");
		});

		it("always calls the latest onPointSelect without re-injecting the script", () => {
			// given
			const first = vi.fn();
			const second = vi.fn();
			const { rerender } = render(
				<ReactDPDPickupMap authKey="key" onPointSelect={first} />,
			);

			// when
			rerender(<ReactDPDPickupMap authKey="key" onPointSelect={second} />);
			window.pointSelected("POINT456");

			// then
			expect(first).not.toHaveBeenCalled();
			expect(second).toHaveBeenCalledWith("POINT456");
		});
	});

	describe("cleanup", () => {
		it("removes the script tag and deletes window.pointSelected on unmount", () => {
			// given
			const { unmount } = render(
				<ReactDPDPickupMap authKey="key" onPointSelect={() => {}} />,
			);

			// when
			unmount();

			// then
			expect(
				document.getElementById("dpd-widget-container"),
			).not.toBeInTheDocument();
			expect(window.pointSelected).toBeUndefined();
		});
	});
});
