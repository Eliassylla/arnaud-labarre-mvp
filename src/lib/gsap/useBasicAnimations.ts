import { useRef, useEffect, useCallback } from 'react';
import { gsap, ScrollTrigger } from './gsap-config';

// Define additional types to help with GSAP-specific properties
type ClearPropsValue = boolean | string | undefined;
type SnapValue = number | number[] | "labels" | "labelsDirectional" | ((value: number) => number) | { 
  snapTo: number | number[] | "labels" | "labelsDirectional" | ((value: number) => number);
  duration?: number;
  delay?: number;
  ease?: string;
};

interface AnimationOptions {
  delay?: number;
  duration?: number;
  ease?: string;
  clearProps?: ClearPropsValue;
  overwrite?: boolean | "auto" | undefined;
  onComplete?: () => void;
  onStart?: () => void;
}

interface FadeOptions extends AnimationOptions {
  y?: number;
  x?: number;
  scale?: number;
  rotation?: number;
  stagger?: number | object;
  from?: boolean;
  opacity?: number;
}

interface ScrollRevealOptions extends FadeOptions {
  trigger?: Element | string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  toggleActions?: string;
  markers?: boolean;
  once?: boolean;
  pin?: boolean | Element | string;
  pinSpacing?: boolean | string;
  anticipatePin?: number;
  snap?: SnapValue;
  pinReparent?: boolean;
}

interface ParallaxOptions {
  trigger?: Element | string;
  speed?: number;
  container?: Element | string;
  start?: string;
  end?: string;
  markers?: boolean;
  scrub?: boolean | number;
  pin?: boolean;
}

/**
 * Hook for GSAP animations with ScrollTrigger integration
 * Implements features from GSAP and ScrollTrigger source code
 */
export function useBasicAnimations() {
  // Ref for the container element
  const containerRef = useRef<HTMLDivElement>(null);
  // Store ScrollTrigger instances for cleanup
  const scrollTriggers = useRef<ScrollTrigger[]>([]);
  const animations = useRef<gsap.core.Tween[]>([]);
  
  // Clean up ScrollTrigger instances and animations on unmount
  useEffect(() => {
    return () => {
      // Kill all ScrollTrigger instances
      scrollTriggers.current.forEach(trigger => {
        if (trigger) trigger.kill();
      });
      scrollTriggers.current = [];
      
      // Kill all animations
      animations.current.forEach(animation => {
        if (animation) animation.kill();
      });
      animations.current = [];
    };
  }, []);
  
  /**
   * Fade in/out animation
   */
  const fade = useCallback((
    elements: string | Element | Element[] | NodeList,
    options: FadeOptions = {}
  ) => {
    const {
      delay = 0,
      duration = 0.8,
      y = 30,
      x = 0,
      scale,
      rotation,
      stagger = 0.1,
      ease = 'power2.out',
      from = true,
      opacity = from ? 0 : 1,
      clearProps = true,
      overwrite = 'auto',
      onComplete,
      onStart
    } = options;
    
    const container = containerRef.current;
    if (!container && typeof elements === 'string') return;
    
    // Get elements to animate
    const targets = typeof elements === 'string'
      ? container!.querySelectorAll(elements)
      : elements instanceof NodeList
        ? elements
        : Array.isArray(elements)
          ? elements
          : [elements];
    
    if (!targets || (targets instanceof NodeList && !targets.length) || 
        (Array.isArray(targets) && !targets.length)) return;
    
    // Create animation
    const animProps: gsap.TweenVars = {
      opacity,
      duration,
      delay,
      stagger: targets.length > 1 || typeof stagger === 'object' ? stagger : 0,
      ease,
      overwrite,
      onComplete,
      onStart
    };
    
    // Handle clearProps specially to avoid type errors
    if (clearProps === true) {
      animProps.clearProps = 'all';
    } else if (typeof clearProps === 'string') {
      animProps.clearProps = clearProps;
    }
    
    // Add position properties if specified
    if (y !== undefined) animProps.y = from ? y : 0;
    if (x !== undefined) animProps.x = from ? x : 0;
    if (scale !== undefined) animProps.scale = from ? scale : 1;
    if (rotation !== undefined) animProps.rotation = from ? rotation : 0;
    
    // Create animation
    const method = from ? gsap.from : gsap.to;
    const animation = method(targets, animProps);
    
    // Store animation for cleanup
    animations.current.push(animation);
    
    return animation;
  }, []);
  
  /**
   * Scroll reveal animation with ScrollTrigger
   */
  const scrollReveal = useCallback((
    elements: string | Element | Element[] | NodeList,
    options: ScrollRevealOptions = {}
  ) => {
    const {
      trigger,
      start = 'top 80%',
      end = 'bottom 20%',
      scrub = false,
      toggleActions = 'play none none none',
      markers = false,
      once = true,
      delay = 0,
      duration = 0.8,
      y = 50,
      x = 0,
      scale,
      rotation,
      stagger = 0.1,
      ease = 'power2.out',
      pin = false,
      pinSpacing = true,
      anticipatePin = 0,
      snap,
      pinReparent,
      clearProps,
      from = true
    } = options;
    
    const container = containerRef.current;
    if (!container && typeof elements === 'string') return;
    
    // Get elements to animate
    const targets = typeof elements === 'string'
      ? container!.querySelectorAll(elements)
      : elements instanceof NodeList
        ? elements
        : Array.isArray(elements)
          ? elements
          : [elements];
    
    if (!targets || (targets instanceof NodeList && !targets.length) || 
        (Array.isArray(targets) && !targets.length)) return;
    
    // Determine trigger element - safely cast to Element
    const triggerElement = trigger 
      ? (typeof trigger === 'string' ? document.querySelector(trigger) as Element : trigger)
      : (typeof elements === 'string' ? container : 
         targets instanceof NodeList || Array.isArray(targets) 
           ? targets[0] as Element 
           : targets as Element);
    
    if (!triggerElement) return;
    
    // Create ScrollTrigger configuration with type-safe properties
    const scrollTriggerConfig: ScrollTrigger.Vars = {
      trigger: triggerElement,
      start,
      end,
      toggleActions,
      markers,
      once,
      scrub,
      pinSpacing,
      anticipatePin,
      id: `scroll-${Math.random().toString(36).substr(2, 9)}`
    };
    
    // Handle pin property safely
    if (pin === true) {
      scrollTriggerConfig.pin = triggerElement;
    } else if (pin) {
      scrollTriggerConfig.pin = pin;
    }
    
    // Handle snap property safely
    if (snap !== undefined) {
      scrollTriggerConfig.snap = snap as any; // Using as any for now as the types are complex
    }
    
    // Handle pinReparent property
    if (pinReparent !== undefined) {
      scrollTriggerConfig.pinReparent = pinReparent;
    }
    
    // Create animation timeline
    const tl = gsap.timeline({ scrollTrigger: scrollTriggerConfig });
    
    // Animation properties
    const animProps: gsap.TweenVars = {
      opacity: from ? 0 : 1,
      duration,
      delay,
      stagger: targets.length > 1 || typeof stagger === 'object' ? stagger : 0,
      ease
    };
    
    // Handle clearProps specially to avoid type errors
    if (clearProps === true) {
      animProps.clearProps = 'all';
    } else if (typeof clearProps === 'string') {
      animProps.clearProps = clearProps;
    } else if (clearProps === undefined && once) {
      animProps.clearProps = 'all';
    }
    
    // Add position properties if specified
    if (y !== undefined) animProps.y = from ? y : 0;
    if (x !== undefined) animProps.x = from ? x : 0;
    if (scale !== undefined) animProps.scale = from ? scale : 1;
    if (rotation !== undefined) animProps.rotation = from ? rotation : 0;
    
    // Add animation to timeline
    const method = from ? 'from' : 'to';
    tl[method](targets, animProps, 0);
    
    // Store the ScrollTrigger instance for cleanup
    if (tl.scrollTrigger) {
      scrollTriggers.current.push(tl.scrollTrigger as ScrollTrigger);
    }
    
    return tl;
  }, []);
  
  /**
   * Create a parallax effect
   */
  const parallax = useCallback((
    element: string | Element,
    options: ParallaxOptions = {}
  ) => {
    const {
      trigger,
      speed = 0.5,
      container,
      start = 'top bottom',
      end = 'bottom top',
      markers = false,
      scrub = true,
      pin = false
    } = options;
    
    const containerEl = containerRef.current;
    if (!containerEl && typeof element === 'string') return;
    
    // Get element to animate
    const targetElement = typeof element === 'string'
      ? containerEl!.querySelector(element)
      : element;
       
    if (!targetElement) return;
    
    // Determine trigger element - safely cast to Element
    const triggerElement = trigger 
      ? (typeof trigger === 'string' ? document.querySelector(trigger) as Element : trigger)
      : targetElement.parentElement || targetElement;
       
    if (!triggerElement) return;
    
    // Create ScrollTrigger
    const st = ScrollTrigger.create({
      trigger: triggerElement,
      start,
      end,
      markers,
      scrub,
      pin: pin === true ? triggerElement : !!pin,
      onUpdate: (self) => {
        // Apply the parallax effect based on scroll progress
        const yPercent = -(self.progress * 100 * speed);
        gsap.set(targetElement, { yPercent });
      }
    });
    
    // Store the ScrollTrigger instance for cleanup
    scrollTriggers.current.push(st);
    
    return st;
  }, []);
  
  /**
   * Create a pin effect with ScrollTrigger
   */
  const pin = useCallback((
    element: string | Element,
    options: {
      start?: string;
      end?: string;
      markers?: boolean;
      pinSpacing?: boolean | string;
      anticipatePin?: number;
      scrub?: boolean | number;
    } = {}
  ) => {
    const {
      start = 'top top',
      end = 'bottom top',
      markers = false,
      pinSpacing = true,
      anticipatePin = 0,
      scrub = false
    } = options;
    
    const containerEl = containerRef.current;
    if (!containerEl && typeof element === 'string') return;
    
    // Get element to pin
    const targetElement = typeof element === 'string'
      ? containerEl!.querySelector(element)
      : element;
       
    if (!targetElement) return;
    
    // Create ScrollTrigger
    const st = ScrollTrigger.create({
      trigger: targetElement,
      start,
      end,
      markers,
      pin: true,
      pinSpacing,
      anticipatePin,
      scrub
    });
    
    // Store the ScrollTrigger instance for cleanup
    scrollTriggers.current.push(st);
    
    return st;
  }, []);
  
  return { 
    containerRef, 
    fade, 
    scrollReveal,
    parallax,
    pin
  };
}