// AddressModal.jsx

"use client";
import React from "react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { AddressScreen } from "./AddressScreen";
import Address from "./AddressScreen";
// Optional: Reuse your existing LabelInputContainer if you like
function LabelInputContainer({ children, className }) {
  return (
    <div className={cn("flex w-full flex-col space-y-2 mt-1", className)}>
      {children}
    </div>
  );
}

// A simple modal for capturing address
export default function AddressModal({ address, setAddress, onClose }) {
  // Example fields: line1, line2, city, state, zip
  const handleChange = (field, value) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
  };

  // You might want a "Save" button or "Close" button
  const handleSave = () => {
    // Optional: Do some validation
    // Then close the modal
    onClose();
  };

  return (
    // A backdrop that covers the screen
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {/* Slide/opacity animation for the popup itself */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.3 }}
        className="max-w-md w-full bg-white dark:bg-zinc-900 rounded-2xlg md:rounded-2xlg shadow-xl"
      >
        <AddressScreen
          address={address}
          setAddress={setAddress}
          onClose={() => setShowAddressModal(false)}
        ></AddressScreen>
      </motion.div>
    </div>
  );
}
