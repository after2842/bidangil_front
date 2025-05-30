"use client";
import { useState } from "react";
import { GlowingEffect } from "./glowing-effect";
export default function DeliveryFeeCalculator() {
  const [volume, setVolume] = useState(0); // in cm^3
  const [mass, setMass] = useState(0); // in kg

  /**
   * Simple shipping-rate example (typical Korean courier dimensional-weight rule)
   *  - Chargeable weight = max(actual mass, volume / 6000)
   *  - Fee per kg = 3,000 KRW
   * Adjust these numbers or swap in your own logic as needed.
   */
  const calculateFee = (v, m) => {
    const chargeableWeight = Math.max(m, v / 6000);
    const feePerKg = 3000; // KRW per kg
    return Math.round(chargeableWeight * feePerKg);
  };

  const fee = calculateFee(volume, mass);

  return (
    <div className="relative w-full max-w-md mx-auto p-6 bg-white text-black rounded-2xl shadow flex flex-col gap-8 border mb-12">
      <GlowingEffect
        blur={0} // 23) Currently blur=0 => no blur. You can increase for bigger glow
        borderWidth={1} // 24) The border around which the glow will appear
        spread={80} // 25) The radius or spread of the glowing area
        glow={true} // 26) must be true to show the glow
        disabled={false} // 27) must be false to register pointer/mouse movement
        proximity={64} // 28) how close the pointer must be to the container
        inactiveZone={0.01} // 29) a small radius around the center to disable the glow
        className="rounded-2xl"
      />{" "}
      <h2 className="text-2xl font-semibold text-center">
        Delivery Fee Calculator
      </h2>
      {/* Volume input */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Volume{" "}
          <span className="text-[10px]">
            (cm<sup>3</sup>)
          </span>
        </label>
        <input
          type="range"
          min={0}
          max={50000}
          step={100}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-full accent-gray-600"
        />
        <input
          type="number"
          min={0}
          max={50000}
          step={10}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-gray-500"
        />
      </div>
      {/* Mass input */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Weight <span className="text-[10px]">(kg)</span>:
        </label>
        <input
          type="range"
          min={0}
          max={30}
          step={0.1}
          value={mass}
          onChange={(e) => setMass(Number(e.target.value))}
          className="w-full accent-gray-600"
        />
        <input
          type="number"
          min={0}
          max={30}
          step={0.1}
          value={mass}
          onChange={(e) => setMass(Number(e.target.value))}
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-gray-500"
        />
      </div>
      {/* Fee output */}
      <div className="text-center">
        <p className="text-lg font-bold tracking-tight">
          Estimated Fee:{" "}
          <span className="">{fee.toLocaleString("ko-KR")} KRW</span>
        </p>
      </div>
    </div>
  );
}
