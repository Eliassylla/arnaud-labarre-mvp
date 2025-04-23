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
  const [isOpen, setIsOpen] = useState(false);

  // Classes conditionnelles pour le bouton
  const getButtonClass = () => {
    if (variant === "outline") {
      return `cursor-pointer bg-white text-[#3E2F1C] hover:bg-[#3E2F1C] hover:text-white ${className}`;
    }
    
    return `rounded-${rounded ? 'full' : 'md'} bg-white text-black border border-white hover:bg-[#3E2F1C] hover:text-white hover:border-white cursor-pointer transition-colors duration-200 ${className}`;
  };

  return (
    <div className="relative">
      <Button 
        variant={variant === "outline" ? "outline" : "default"} 
        size={size}
        className={getButtonClass()}
        onClick={() => setIsOpen(!isOpen)}
      >
        {buttonText}
      </Button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 bg-white rounded shadow-lg py-2 w-48 z-50">
          {phoneNumbers.map((item) => (
            <Link 
              key={item.number} 
              href={`tel:${item.number}`} 
              className="flex items-center px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full"
              onClick={() => setIsOpen(false)}
            >
              <Phone className="mr-2 h-4 w-4" />
              <span>{item.label}: {item.number.replace(/(\d{2})(?=\d)/g, '$1 ')}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
} 