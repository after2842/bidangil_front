"use client";
import React, { useState, useRef } from "react";

/**
 * PixelAvatarCustomizer.jsx
 * ----------------------------------------------------
 * A self‑contained React component that lets users build a small pixel avatar
 * by choosing gender, hair, eyes, mouth and pants. The composed avatar is
 * previewed live (SVG) and can be exported as a PNG and POSTed to your backend
 * when the user presses **Confirm**.
 *
 * ➡️ Drop this file anywhere in your Next.js/React project and add
 *    <PixelAvatarCustomizer /> to a page.
 *
 * Tailwind CSS is used for layout & styling (no extra config needed).
 */

// --- 1️⃣  Sprite definitions --------------------------------------------------
// 32×48 pixel coordinate space (SVG viewBox="0 0 32 48")

const BodySprites = {
  male: (
    <g
      key="body-male"
      shapeRendering="crispEdges"
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      {/* DB-16 colours */}
      {/* skin light  */
      /* #d2aa99 */}
      {/* skin dark   */
      /* #854c30 */}
      {/* hair light  */
      /* #442434 */}
      {/* hair dark   */
      /* #30346d */}
      {/* shirt light */
      /* #8595a1 */}
      {/* shirt dark  */
      /* #4e4a4e */}
      {/* pant light  */
      /* #30346d */}
      {/* pant dark   */
      /* #140c1c */}

      {/* === HEAD & HAIR (8×8 px) === */}
      {/* head base */}
      <rect x="12" y="0" width="8" height="8" fill="#d2aa99" />
      {/* face shading (RHS) */}
      <rect x="16" y="2" width="4" height="6" fill="#854c30" />
      {/* hair top & side-burns */}
      <rect x="11" y="-1" width="10" height="3" fill="#442434" />
      <rect x="11" y="2" width="2" height="4" fill="#442434" />
      <rect x="19" y="2" width="2" height="4" fill="#30346d" />

      {/* eyes */}
      <rect x="14" y="3" width="2" height="2" fill="#000000" />
      <rect x="18" y="3" width="2" height="2" fill="#000000" />
      {/* mouth */}
      <rect x="15" y="6" width="2" height="1" fill="#d04648" />

      {/* === NECK === */}
      <rect x="14" y="8" width="4" height="2" fill="#d2aa99" />

      {/* === TORSO (shirt 10×6) === */}
      <rect x="11" y="10" width="10" height="6" fill="#8595a1" />
      {/* shirt shadow */}
      <rect x="16" y="12" width="5" height="4" fill="#4e4a4e" />

      {/* === ARMS === */}
      <rect x="8" y="10" width="3" height="8" fill="#d2aa99" />
      <rect x="21" y="10" width="3" height="8" fill="#d2aa99" />
      {/* arm shadows */}
      <rect x="9" y="14" width="2" height="4" fill="#854c30" />
      <rect x="21" y="14" width="2" height="4" fill="#854c30" />

      {/* === PANTS / WAIST === */}
      <rect x="10" y="16" width="12" height="8" fill="#30346d" />
      <rect x="16" y="18" width="6" height="6" fill="#140c1c" />

      {/* === LEGS === */}
      <rect x="12" y="24" width="3" height="8" fill="#d2aa99" />
      <rect x="17" y="24" width="3" height="8" fill="#d2aa99" />
      {/* leg shadows */}
      <rect x="14" y="28" width="1" height="4" fill="#854c30" />
      <rect x="18" y="28" width="1" height="4" fill="#854c30" />

      {/* === SHOES === */}
      <rect x="12" y="32" width="3" height="2" fill="#140c1c" />
      <rect x="17" y="32" width="3" height="2" fill="#140c1c" />
    </g>
  ),
  female: (
    <g key="body-female">
      {/* head */}
      <rect x="12" y="0" width="8" height="8" fill="#f5bb95" />
      {/* torso + slight waist */}
      <rect x="11" y="8" width="10" height="6" fill="#f5bb95" />
      <rect x="10" y="14" width="12" height="8" fill="#f5bb95" />
      {/* legs */}
      <rect x="10" y="22" width="5" height="12" fill="#f5bb95" />
      <rect x="17" y="22" width="5" height="12" fill="#f5bb95" />
    </g>
  ),
};

// Five simple hairstyles
const HairSprites = [
  <rect key="h0" x="8" y="-2" width="16" height="6" fill="#000" />, // crew cut
  <rect key="h1" x="6" y="-1" width="20" height="8" fill="#4b4b4b" />, // bowl
  <rect key="h2" x="10" y="-2" width="12" height="4" fill="#d5912b" />, // short blond
  <rect key="h3" x="6" y="-3" width="20" height="10" fill="#9141ac" />, // lavender long
  <rect key="h4" x="8" y="-1" width="16" height="7" fill="#2678b2" />, // side part
];

// Eyes (pair of 2×2 pixels)
const EyeSprites = [
  <g key="e0">
    <rect x="14" y="4" width="2" height="2" fill="#000" />
    <rect x="18" y="4" width="2" height="2" fill="#000" />
  </g>,
  <g key="e1">
    <rect x="14" y="4" width="2" height="2" fill="#00b894" />
    <rect x="18" y="4" width="2" height="2" fill="#00b894" />
  </g>,
  <g key="e2">
    <rect x="14" y="4" width="2" height="2" fill="#e17055" />
    <rect x="18" y="4" width="2" height="2" fill="#e17055" />
  </g>,
  <g key="e3">
    <rect x="14" y="4" width="2" height="2" fill="#0984e3" />
    <rect x="18" y="4" width="2" height="2" fill="#0984e3" />
  </g>,
  <g key="e4">
    <rect x="14" y="4" width="2" height="2" fill="#6c5ce7" />
    <rect x="18" y="4" width="2" height="2" fill="#6c5ce7" />
  </g>,
];
const genders = ["male", "female"];
// Mouths
const MouthSprites = [
  <rect key="m0" x="15" y="8" width="4" height="1" fill="#c0392b" />,
  <rect key="m1" x="15" y="8" width="4" height="1" fill="#d35400" />,
  <rect key="m2" x="15" y="8" width="4" height="1" fill="#2d3436" />,
  <rect key="m3" x="15" y="8" width="4" height="1" fill="#27ae60" />,
  <rect key="m4" x="15" y="8" width="4" height="1" fill="#8e44ad" />,
];

// Pants
const PantsSprites = [
  <rect key="p0" x="10" y="19" width="12" height="5" fill="#1e3799" />,
  <rect key="p1" x="10" y="19" width="12" height="5" fill="#0c2461" />,
  <rect key="p2" x="10" y="19" width="12" height="5" fill="#6ab04c" />,
  <rect key="p3" x="10" y="19" width="12" height="5" fill="#fdcb6e" />,
  <rect key="p4" x="10" y="19" width="12" height="5" fill="#e056fd" />,
];

// --- 2️⃣  Component -----------------------------------------------------------
export default function PixelAvatarCustomizer() {
  const [gender, setGender] = useState("male");
  const [hair, setHair] = useState(0);
  const [eyes, setEyes] = useState(0);
  const [mouth, setMouth] = useState(0);
  const [pants, setPants] = useState(0);
  const canvasRef = useRef(null);

  // Helper: render selected avatar into <canvas> for PNG export
  const renderToCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    // Clear & upscale (each SVG unit = 4 canvas pixels)
    const scale = 4;
    canvas.width = 32 * scale;
    canvas.height = 48 * scale;
    ctx.imageSmoothingEnabled = false;
    const svgString = new XMLSerializer().serializeToString(
      document.getElementById("avatar-svg")
    );
    const img = new Image();
    const svgBlob = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      // Now you can get PNG data
      canvas.toBlob((blob) => {
        if (!blob) return;
        // Example POST – replace with your endpoint & auth
        fetch("/api/avatar", {
          method: "POST",
          headers: { "Content-Type": "image/png" },
          body: blob,
        });
      });
    };
    img.src = url;
  };

  // Reusable option renderer
  const OptionBar = ({ label, count, current, setCurrent }) => (
    <div className="flex items-center space-x-2 my-2">
      <span className="w-20 text-right capitalize">{label}:</span>
      {Array.from({ length: count }).map((_, idx) => (
        <button
          key={idx}
          onClick={() => setCurrent(idx)}
          className={`w-6 h-6 border rounded-sm ${
            current === idx ? "border-blue-600" : "border-gray-400"
          }`}
        >
          {idx + 1}
        </button>
      ))}
    </div>
  );

  return (
    <div className="max-w-xl mx-auto p-6 font-sans text-gray-800">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Pixel Avatar Maker
      </h1>

      {/* Preview */}
      <div className="flex justify-center mb-6">
        <svg
          id="avatar-svg"
          viewBox="0 0 32 48"
          width="128"
          height="192"
          shapeRendering="crispEdges"
        >
          {BodySprites[gender]}
          {HairSprites[hair]}
          {EyeSprites[eyes]}
          {MouthSprites[mouth]}
          {PantsSprites[pants]}
        </svg>
      </div>

      {/* Controls */}
      <div className="bg-gray-100 p-4 rounded-xl">
        {/* gender toggle */}
        <div className="flex items-center space-x-2 mb-4">
          <span className="w-20 text-right">Gender:</span>
          {genders.map((g) => (
            <button
              key={g}
              onClick={() => setGender(g)}
              className={`px-3 py-1 rounded-full capitalize border ${
                gender === g ? "bg-blue-600 text-white" : "bg-white"
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        <OptionBar label="hair" count={5} current={hair} setCurrent={setHair} />
        <OptionBar label="eyes" count={5} current={eyes} setCurrent={setEyes} />
        <OptionBar
          label="mouth"
          count={5}
          current={mouth}
          setCurrent={setMouth}
        />
        <OptionBar
          label="pants"
          count={5}
          current={pants}
          setCurrent={setPants}
        />
      </div>

      {/* Confirm */}
      <div className="text-center mt-6">
        <button
          onClick={renderToCanvas}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        >
          Confirm & Upload
        </button>
      </div>

      {/* hidden canvas for PNG export */}
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}
