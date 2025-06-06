import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Observer } from 'gsap/Observer';

// Only register plugins on the client-side
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Observer);
  
  // Import ScrollSmoother dynamically (it's only used client-side)
  import('gsap/ScrollSmoother').then(({ ScrollSmoother }) => {
    gsap.registerPlugin(ScrollSmoother);
  });

  // Default GSAP configuration
  gsap.config({
    autoSleep: 60,
    force3D: true,
    nullTargetWarn: false,
  });

  // Default ScrollTrigger configuration based on what we saw in the source code
  // Only configure if ScrollTrigger exists and is registered
  if (ScrollTrigger && ScrollTrigger.config) {
    ScrollTrigger.config({
      ignoreMobileResize: true,
      autoRefreshEvents: 'visibleChange,DOMContentLoaded,load,resize',
    });
  }

  // Default GSAP defaults
  gsap.defaults({
    ease: 'power2.out',
    duration: 0.8,
    overwrite: 'auto',
  });
}

export { gsap, ScrollTrigger, ScrollToPlugin, Observer };