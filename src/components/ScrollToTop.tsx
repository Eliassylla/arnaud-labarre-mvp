'use client';

import { useEffect } from 'react';

export default function ScrollToTop() {
  // Appliquer immédiatement un style pour prévenir le flash
  useEffect(() => {
    // Injecter un style dès que possible pour éviter le flash
    if (typeof window !== 'undefined') {
      // Vérifier si c'est un rechargement
      const isReload = 
        window.performance?.navigation?.type === 1 || 
        sessionStorage.getItem('page_reloaded') === 'true';
      
      if (isReload) {
        // Créer et injecter un style immédiatement
        const initialStyle = document.createElement('style');
        initialStyle.id = 'scroll-reset-style';
        initialStyle.innerHTML = `
          body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #3E2F1C;
            z-index: 9999;
            opacity: 1;
            transition: opacity 0.3s ease-out;
            pointer-events: none;
          }
        `;
        document.head.appendChild(initialStyle);
      }
    }
  }, []);
  
  useEffect(() => {
    // Fonction pour s'assurer que la page est au sommet
    const resetViewport = () => {
      if (typeof window !== 'undefined') {
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
        
        // Attendre que tout soit bien chargé avant de faire disparaître l'overlay
        setTimeout(() => {
          // Trouver ou créer l'élément de style d'overlay
          let overlayStyle = document.getElementById('scroll-reset-style');
          if (!overlayStyle) {
            overlayStyle = document.createElement('style');
            overlayStyle.id = 'scroll-reset-style';
            document.head.appendChild(overlayStyle);
          }
          
          // Faire disparaître l'overlay en douceur
          overlayStyle.innerHTML = `
            body::before {
              content: '';
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-color: #3E2F1C;
              z-index: 9999;
              opacity: 0;
              transition: opacity 0.3s ease-out;
              pointer-events: none;
            }
          `;
          
          // Nettoyer le style après la transition
          setTimeout(() => {
            if (overlayStyle && document.head.contains(overlayStyle)) {
              document.head.removeChild(overlayStyle);
            }
          }, 400);
        }, 200);
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