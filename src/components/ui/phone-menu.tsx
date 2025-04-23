'use client';

import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface PhoneNumber {
  number: string;
  label: string;
}

export const phoneNumbers: PhoneNumber[] = [
  { number: "0496892531", label: "Mobile" },
  { number: "023669134", label: "Fixe" },
];

interface PhoneMenuProps {
  variant?: "default" | "outline";
  buttonText?: string;
  size?: "default" | "sm" | "lg";
  rounded?: boolean;
  className?: string;
}

export function PhoneMenu({
  variant = "default",
  buttonText = "Appeler",
  size = "default",
  rounded = false,
  className = "",
}: PhoneMenuProps) {
  // Afficher les numéros directement sous forme de texte
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col gap-2 bg-white/95 p-4 rounded-lg shadow-md">
        {phoneNumbers.map((item) => (
          <Link 
            key={item.number} 
            href={`tel:${item.number}`}
            className="flex items-center text-sm text-[#3E2F1C] whitespace-nowrap"
          >
            <Phone className="mr-2 h-4 w-4" />
            <span>{item.label}: {item.number.replace(/(\d{2})(?=\d)/g, '$1 ')}</span>
          </Link>
        ))}
      </div>
    </div>
  );
} 