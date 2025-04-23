"use client";

import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, MoveRight, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useScrollToSection } from "@/lib/useScrollToSection";

function Header1() {
    const { scrollToSection } = useScrollToSection();
    
    const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        // Si c'est un lien d'ancrage (commence par #), utiliser notre fonction personnalisée
        if (href.startsWith('#')) {
            e.preventDefault();
            scrollToSection(href);
            
            // Fermer le menu mobile si ouvert
            if (isOpen) {
                setOpen(false);
            }
        }
        // Sinon, laisser le comportement de navigation normal pour les liens externes
    };
    
    const navigationItems = [
        {
            title: "Accueil",
            href: "#accueil",
            description: "Page d'accueil de notre entreprise",
        },
        {
            title: "À propos",
            href: "#a-propos",
            description: "Témoignages et retours de nos clients",
        },
        {
            title: "Nos Services",
            href: "#services",
            description: "Découvrez nos services personnalisés",
        },
        {
            title: "Nos Atouts",
            href: "#atouts",
            description: "Pourquoi nous choisir"
        },
        {
            title: "Atelier",
            href: "#realisations",
            description: "Fonctionnalités principales de notre offre",
            items: [
                {
                    title: "Galerie",
                    href: "/realisations"
                }
            ]
        },
        {
            title: "FAQ",
            href: "#faq",
            description: "Questions fréquemment posées"
        },
        {
            title: "Contact",
            href: "#contact",
            description: "Coordonnées et informations de contact"
        },
    ];

    const [isOpen, setOpen] = useState(false);
    return (
        <header className="w-full z-40 fixed top-0 left-0 bg-[#3E2F1C] text-[#F5F5F5]">
            <div className="container relative mx-auto min-h-20 px-4 flex gap-4 items-center justify-between lg:justify-between md:justify-between sm:justify-start">
                <div className="flex w-12 shrink items-start justify-start lg:hidden">
                    <Button variant="ghost" onClick={() => setOpen(!isOpen)}>
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </Button>
                    {isOpen && (
                        <div className="absolute top-20 border-t flex flex-col w-full right-0 bg-white text-black shadow-lg py-4 px-4 gap-8 z-50">
                            {navigationItems.map((item) => (
                                <div key={item.title}>
                                    <div className="flex flex-col gap-2">
                                        {item.href ? (
                                            <a 
                                                href={item.href}
                                                className="flex justify-between items-center cursor-pointer"
                                                onClick={(e) => handleNavigation(e, item.href)}
                                            >
                                                <span className="text-lg">{item.title}</span>
                                            </a>
                                        ) : (
                                            <p className="text-lg">{item.title}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="justify-start items-center gap-4 lg:flex hidden flex-row">
                    <NavigationMenu className="flex justify-start items-start">
                        <NavigationMenuList className="flex justify-start gap-4 flex-row">
                            {navigationItems.map((item) => (
                                <NavigationMenuItem key={item.title}>
                                    {item.href ? (
                                        <>
                                            <a 
                                                href={item.href}
                                                onClick={(e) => handleNavigation(e, item.href)}
                                            >
                                                <Button variant="ghost" className="cursor-pointer">{item.title}</Button>
                                            </a>
                                        </>
                                    ) : (
                                        <>
                                            <NavigationMenuTrigger className="font-medium text-sm cursor-pointer">
                                                {item.title}
                                            </NavigationMenuTrigger>
                                            <NavigationMenuContent className="!w-[450px] p-4">
                                                <div className="flex flex-col lg:grid grid-cols-2 gap-4">
                                                    <div className="flex flex-col h-full justify-between">
                                                        <div className="flex flex-col">
                                                            <p className="text-base">{item.title}</p>
                                                            <p className="text-muted-foreground text-sm">
                                                                {item.description}
                                                            </p>
                                                        </div>
                                                        <Button size="sm" className="mt-10">
                                                            Book a call today
                                                        </Button>
                                                    </div>
                                                    <div className="flex flex-col text-sm h-full justify-end">
                                                        {item.items?.map((subItem) => (
                                                            <NavigationMenuLink
                                                                href={subItem.href}
                                                                key={subItem.title}
                                                                className="flex flex-row justify-between items-center hover:bg-muted py-2 px-4 rounded"
                                                            >
                                                                <span>{subItem.title}</span>
                                                                <MoveRight className="w-4 h-4 text-muted-foreground" />
                                                            </NavigationMenuLink>
                                                        ))}
                                                    </div>
                                                </div>
                                            </NavigationMenuContent>
                                        </>
                                    )}
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <div className="flex lg:justify-center">
                    <p className="font-semibold"></p>
                </div>
                <div className="flex justify-end w-full gap-4">
                    <div className="border-r hidden lg:inline"></div>
                    <Button variant="outline" className="cursor-pointer bg-white text-[#3E2F1C] hover:bg-[#3E2F1C] hover:text-white">Appeler</Button>
                    <a href="#form" onClick={(e) => handleNavigation(e, '#form')}>
                        <Button className="cursor-pointer bg-[#3E2F1C] text-white hover:bg-[#2d2316]">Devis</Button>
                    </a>
                </div>
            </div>
        </header>
    );
}

export { Header1 };