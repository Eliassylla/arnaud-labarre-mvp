'use client';

import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface PhoneNumber {
  number: string;
  label: string;
  display: string;
}

export const phoneNumbers: PhoneNumber[] = [
  { number: "0496892531", label: "Tel.", display: "0496 89 25 31" },
  { number: "023669134", label: "Fixe", display: "02 36 69 13 4" },
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
  const [showMenu, setShowMenu] = useState(false);
  
  return (
    <div className="relative inline-block text-left">
      <div
        onMouseEnter={() => setShowMenu(true)}
        onMouseLeave={() => setShowMenu(false)}
      >
        <Button 
          variant={variant}
          size={size}
          className={`${className} flex items-center gap-2 ${rounded ? "rounded-full" : ""}`}
        >
          <Phone className="h-4 w-4" />
          {buttonText}
        </Button>
        
        {showMenu && (
          <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
            <div className="py-1">
              {phoneNumbers.map((item) => (
                <Link 
                  key={item.number} 
                  href={`tel:${item.number}`}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <span>{item.label} : {item.display}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 