import { useBasicAnimations as useGsapAnimations } from '@/lib/gsap/useBasicAnimations';
import { useSmoothScroll } from '@/lib/gsap/useSmoothScroll';

/**
 * Re-export animation hooks for easier access
 */
export const useBasicAnimations = useGsapAnimations;
export { useSmoothScroll }; 