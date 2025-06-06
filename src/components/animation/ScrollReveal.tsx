'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap/gsap-config';
import { cn } from '@/lib/utils';

type AnimationDirection = 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: AnimationDirection;
  distance?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  className?: string;
  once?: boolean;
  toggleActions?: string;
  pin?: boolean;
  pinSpacing?: boolean | string;
  anticipatePin?: number;
  disabled?: boolean;
}

/**
 * ScrollReveal component that animates its children when they come into view
 * Based on GSAP ScrollTrigger capabilities
 */
export function ScrollReveal({
  children,
  direction = 'up',
  distance = 30,
  duration = 0.8,
  delay = 0,
  stagger = 0.1,
  start = 'top 60%',
  end = 'bottom center',
  scrub = false,
  markers = false,
  className,
  once = true,
  toggleActions = 'play none none none',
  pin = false,
  pinSpacing = true,
  anticipatePin = 0,
  disabled = false
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const [isClient, setIsClient] = useState(false);
  
  // Detect client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  useEffect(() => {
    // Skip if disabled, not on client, or ScrollTrigger not available
    if (disabled || !isClient || typeof ScrollTrigger === 'undefined') return;
    
    const element = elementRef.current;
    if (!element) return;
    
    // Get all direct children
    const items = Array.from(element.children);
    if (!items.length) return;
    
    // Set initial state
    gsap.set(items, { autoAlpha: 0 });
    
    // Create animation based on direction
    const animProps: gsap.TweenVars = { 
      autoAlpha: 1,
      duration,
      ease: 'power2.out',
      clearProps: once ? 'all' : 'none'
    };
    
    if (direction === 'up' || direction === 'down') {
      animProps.y = direction === 'up' ? distance : -distance;
    } else if (direction === 'left' || direction === 'right') {
      animProps.x = direction === 'left' ? distance : -distance;
    } else if (direction === 'scale') {
      animProps.scale = 0.8;
    }
    
    // Make sure ScrollTrigger is registered
    if (typeof window !== 'undefined' && ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
    }
    
    // Create timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: start,
        end: end,
        scrub: scrub,
        markers: markers,
        toggleActions: toggleActions,
        pin: pin,
        pinSpacing: pinSpacing,
        anticipatePin: anticipatePin,
        once: once,
        onEnter: () => {
          gsap.to(items, {
            ...animProps,
            y: 0,
            x: 0,
            scale: 1,
            stagger: items.length > 1 ? stagger : 0,
            delay
          });
        },
        onLeave: !once ? () => {
          gsap.to(items, {
            autoAlpha: 0,
            y: direction === 'up' ? -distance / 2 : direction === 'down' ? distance / 2 : 0,
            x: direction === 'left' ? -distance / 2 : direction === 'right' ? distance / 2 : 0,
            scale: direction === 'scale' ? 0.9 : 1,
            duration: duration / 1.5,
            ease: 'power2.in'
          });
        } : undefined,
        onEnterBack: !once ? () => {
          gsap.to(items, {
            ...animProps,
            y: 0,
            x: 0,
            scale: 1,
            stagger: items.length > 1 ? stagger : 0
          });
        } : undefined,
        onLeaveBack: !once ? () => {
          gsap.to(items, {
            autoAlpha: 0,
            y: direction === 'up' ? distance / 2 : direction === 'down' ? -distance / 2 : 0,
            x: direction === 'left' ? distance / 2 : direction === 'right' ? -distance / 2 : 0,
            scale: direction === 'scale' ? 0.9 : 1,
            duration: duration / 1.5,
            ease: 'power2.in'
          });
        } : undefined
      }
    });
    
    // Save the ScrollTrigger instance for cleanup
    triggerRef.current = tl.scrollTrigger as ScrollTrigger;
    
    return () => {
      if (triggerRef.current) {
        triggerRef.current.kill();
      }
    };
  }, [
    children, 
    direction, 
    distance, 
    duration, 
    delay, 
    stagger, 
    start, 
    end, 
    scrub, 
    markers, 
    once, 
    toggleActions,
    pin,
    pinSpacing,
    anticipatePin,
    disabled,
    isClient
  ]);
  
  // If on server side or first render, just return children without animation
  if (!isClient) {
    return <div className={cn(className)}>{children}</div>;
  }
  
  return (
    <div ref={elementRef} className={cn(className)}>
      {children}
    </div>
  );
}