'use client';

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Phone } from "lucide-react";
import Link from "next/link";

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
  // Classes conditionnelles pour le bouton
  const getButtonClass = () => {
    if (variant === "outline") {
      return `cursor-pointer bg-white text-[#3E2F1C] hover:bg-[#3E2F1C] hover:text-white ${className}`;
    }
    
    return `rounded-${rounded ? 'full' : 'md'} bg-white text-black border border-white hover:bg-[#3E2F1C] hover:text-white hover:border-white cursor-pointer transition-colors duration-200 ${className}`;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant={variant === "outline" ? "outline" : "default"} 
          size={size}
          className={getButtonClass()}
        >
          {buttonText}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {phoneNumbers.map((item) => (
          <DropdownMenuItem key={item.number} className="cursor-pointer">
            <Link href={`tel:${item.number}`} className="flex items-center w-full">
              <Phone className="mr-2 h-4 w-4" />
              <span>{item.label}: {item.number.replace(/(\d{2})(?=\d)/g, '$1 ')}</span>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 