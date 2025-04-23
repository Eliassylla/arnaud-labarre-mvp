'use client';

interface ScrollOptions {
  offset?: number;
  behavior?: ScrollBehavior;
}

/**
 * Hook personnalisé pour gérer le défilement vers les sections
 * avec un meilleur contrôle et des offsets personnalisés
 */
export const useScrollToSection = () => {
  // Fonction principale pour gérer le défilement vers une section
  const scrollToSection = (sectionId: string, options: ScrollOptions = {}) => {
    // Empêcher le comportement par défaut du navigateur
    const event = window.event;
    if (event) {
      event.preventDefault();
    }

    // Valeurs par défaut - augmentées pour assurer un meilleur positionnement
    const { 
      offset = window.innerWidth <= 768 ? 300 : 280, // Offset augmenté (+60px)
      behavior = 'smooth' 
    } = options;

    // Trouver la section cible
    const targetSection = document.getElementById(sectionId.replace('#', ''));
    
    if (!targetSection) return false;
    
    // Calculer la position avec l'offset
    const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - offset;
    
    // Effectuer le défilement
    window.scrollTo({
      top: targetPosition,
      behavior
    });
    
    // Mettre à jour l'URL si c'est un lien d'ancrage
    if (sectionId.startsWith('#')) {
      window.history.pushState(null, '', sectionId);
    }
    
    return true;
  };

  return { scrollToSection };
}; 