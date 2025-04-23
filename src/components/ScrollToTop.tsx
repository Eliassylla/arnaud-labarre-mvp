'use client';

import { useEffect, useRef } from 'react';

export default function ScrollToTop() {
  // Référence pour vérifier si c'est le premier chargement
  const isFirstRender = useRef(true);
  
  useEffect(() => {
    // Fonction pour défiler vers le haut immédiatement
    const forceScrollTop = () => {
      // Essayons plusieurs méthodes pour s'assurer que ça fonctionne partout
      window.scrollTo(0, 0);
      
      // Pour les navigateurs mobiles récalcitrants
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      
      // Pour les situations où le scroll ne fonctionne pas immédiatement
      setTimeout(() => {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }, 50);
    };

    // Cette partie s'exécute une seule fois au chargement initial
    if (isFirstRender.current) {
      isFirstRender.current = false;
      
      // Retirer tout fragment d'URL (#) si présent
      if (window.location.hash) {
        window.history.replaceState(
          null, 
          document.title, 
          window.location.pathname + window.location.search
        );
      }

      // Forcer le défilement vers le haut
      forceScrollTop();
      
      // Pour être vraiment certain sur les appareils mobiles récalcitrants
      const intervalId = setInterval(() => {
        if (window.scrollY > 0) {
          forceScrollTop();
        } else {
          clearInterval(intervalId);
        }
      }, 100);
      
      // Nettoyer l'intervalle après 1 seconde maximum
      setTimeout(() => clearInterval(intervalId), 1000);
    }
  }, []);

  // Hook spécifique pour gérer les rechargements de page
  useEffect(() => {
    // Gestionnaire d'événement pour le défilement
    const handleBeforeUnload = () => {
      // Stocke une marque dans sessionStorage pour identifier un rechargement
      sessionStorage.setItem('page_reloaded', 'true');
    };

    // Vérifier si la page a été rechargée et défiler vers le haut si c'est le cas
    if (typeof window !== 'undefined') {
      if (sessionStorage.getItem('page_reloaded') === 'true') {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        sessionStorage.removeItem('page_reloaded');
      }
      
      // Ajouter l'écouteur d'événement
      window.addEventListener('beforeunload', handleBeforeUnload);
      
      // Nettoyer
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, []);

  return null;
} 