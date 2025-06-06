/**
 * Configuration for scroll offsets by section ID.
 * Use this to customize how far below the header each section should appear.
 * 
 * Values are in pixels and will be subtracted from the header height.
 * - Positive values = more space (section appears lower)
 * - Negative values = less space (section appears higher)
 */

// Desktop offset values (screens larger than 768px)
export const desktopOffsets: Record<string, number> = {
  'accueil': -120,        // Default - right below header
  'a-propos': -120,       // Slightly higher than default 
  'services': -120,       // Higher to show more content
  'atouts': -220,
  'realisations': -220,
  'faq': -220,
  'contact': -30,
  
  // If you need to target the form specifically (for "Demander votre devis" button)
  'form': -80,           // Show more of the form when scrolling to it
  
  // Default value for sections not explicitly listed
  'default': -20
};

// Mobile offset values (screens 768px and smaller)
export const mobileOffsets: Record<string, number> = {
  'accueil': -100,          // Default - right below header
  'a-propos':-180,        // More space on mobile 
  'services': -210,       // More space for mobile UI
  'atouts': -150,
  'realisations': -320,
  'faq': -150,
  'contact': -10,
  
  // If you need to target the form specifically (for "Demander votre devis" button)
  'form': 120,           // More space for form on mobile
  
  // Default value for sections not explicitly listed
  'default': 60
};

/**
 * Gets the offset for a specific section ID
 */
export function getSectionOffset(sectionId: string): number {
  // Clean the section ID (remove any # prefix)
  const cleanId = sectionId.replace(/^#/, '');
  
  // Check if we're on mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  
  // Use mobile or desktop offsets based on screen size
  const offsets = isMobile ? mobileOffsets : desktopOffsets;
  
  // Return the specific offset or the default if not found
  return offsets[cleanId] ?? offsets.default;
} 