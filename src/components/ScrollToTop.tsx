'use client';

import { useEffect } from 'react';

export default function ScrollToTop() {
  useEffect(() => {
    // Fonction pour s'assurer que la page est au sommet
    const resetViewport = () => {
      if (typeof window !== 'undefined') {
        // Masquer le défilement avec un style global temporaire
        const style = document.createElement('style');
        style.innerHTML = `
          html, body {
            overflow: hidden !important;
            height: 100vh !important;
            scroll-behavior: auto !important;
          }
          body {
            opacity: 0;
            transition: opacity 0.1s;
          }
        `;
        document.head.appendChild(style);
        
        // Reset immédiat de la position de défilement
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        
        // Supprimer tout fragment (#) de l'URL
        if (window.location.hash) {
          window.history.replaceState(
            null, 
            document.title, 
            window.location.pathname + window.location.search
          );
        }
        
        // Petit délai pour s'assurer que tout est prêt
        setTimeout(() => {
          // Modifier le style pour révéler le contenu
          document.body.style.opacity = '1';
          // Supprimer le style temporaire après la transition
          setTimeout(() => {
            if (document.head.contains(style)) {
              document.head.removeChild(style);
            }
          }, 150);
        }, 100);
      }
    };

    // Vérifier si c'est un rechargement de page
    const isPageLoad = typeof window !== 'undefined';
    const isReload = isPageLoad && (
      window.performance?.navigation?.type === 1 || 
      sessionStorage.getItem('page_reloaded') === 'true'
    );
      
    // Si c'est un rechargement, appliquer notre stratégie
    if (isReload) {
      resetViewport();
      sessionStorage.removeItem('page_reloaded');
    }
    
    // Ajouter un gestionnaire pour les futurs rechargements
    if (isPageLoad) {
      const handleBeforeUnload = () => {
        sessionStorage.setItem('page_reloaded', 'true');
      };
      
      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, []);

  return null;
} 