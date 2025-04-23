'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Attendre que le composant soit monté côté client
    setMounted(true);
  }, []);

  useEffect(() => {
    // Ne s'exécute que côté client après le montage
    if (!mounted) return;

    // Fonction pour remonter en haut de page
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'instant' // Comportement instantané pour éviter l'animation
      });
    };

    // S'exécute quand la page est chargée
    if (typeof window !== 'undefined' && window.performance && (
      window.performance.navigation.type === 1 || // Type 1 est un rechargement (F5)
      document.referrer.includes(window.location.host) // ou si on vient du même domaine
    )) {
      // Si l'URL contient un fragment (#), le supprimer sans recharger la page
      if (window.location.hash) {
        // Changer l'URL sans rechargement
        window.history.pushState('', document.title, window.location.pathname + window.location.search);
      }
      // Remonter en haut de page
      scrollToTop();
    }

    // Surveiller également les changements de route Next.js
    scrollToTop();
  }, [pathname, mounted]);

  // Ce composant ne rend rien visuellement
  return null;
} 