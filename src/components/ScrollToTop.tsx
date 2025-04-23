'use client';

import { useEffect } from 'react';

// Fonction utilisée lors de la navigation pour revenir au début sans animation
const scrollToTop = () => {
  if (typeof window !== 'undefined') {
    // Supprimer tout fragment (#) de l'URL
    if (window.location.hash) {
      window.history.replaceState(
        null,
        document.title,
        window.location.pathname + window.location.search
      );
    }
    
    // Revenir au début de la page instantanément
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
};

export default function ScrollToTop() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Exécuter scrollToTop immédiatement
    scrollToTop();
    
    // Répéter plusieurs fois pour s'assurer que cela fonctionne sur tous les appareils
    const timeoutIds = [
      setTimeout(scrollToTop, 0),
      setTimeout(scrollToTop, 50),
      setTimeout(scrollToTop, 100)
    ];
    
    // Vérifier si c'est un rechargement et configurer pour le prochain rechargement
    const isReload = 
      window.performance?.navigation?.type === 1 || 
      sessionStorage.getItem('page_reloaded') === 'true';
    
    if (isReload) {
      sessionStorage.removeItem('page_reloaded');
    }
    
    // Configurer pour le prochain rechargement
    const handleBeforeUnload = () => {
      sessionStorage.setItem('page_reloaded', 'true');
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Nettoyer
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      timeoutIds.forEach(id => clearTimeout(id));
    };
  }, []);

  return null;
} 