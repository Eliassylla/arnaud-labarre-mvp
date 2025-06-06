'use client';

import React, { useEffect, useRef, useState, ElementType } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap/gsap-config';
import { cn } from '@/lib/utils';

interface TextRevealProps {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  useScrollTrigger?: boolean;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  once?: boolean;
  toggleActions?: string;
  ease?: string;
  y?: number;
  x?: number;
  scale?: number;
  rotation?: number;
  splitBy?: 'chars' | 'words' | 'lines';
}

/**
 * TextReveal component animates text by splitting it into characters, words, or lines
 */
export function TextReveal({
  text,
  as: Component = 'div',
  className,
  delay = 0,
  duration = 0.05,
  stagger = 0.02,
  useScrollTrigger = true,
  start = 'top bottom-=10%',
  end = 'bottom top+=10%',
  scrub = false,
  markers = false,
  once = true,
  toggleActions = 'play none none none',
  ease = 'power2.out',
  y = 10,
  x = 0,
  scale = 1,
  rotation = 0,
  splitBy = 'chars'
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const elementsRef = useRef<HTMLElement[]>([]);
  const [isClient, setIsClient] = useState(false);
  
  // Detect client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  useEffect(() => {
    // Only run on client side
    if (!isClient || typeof window === 'undefined') return;
    
    const container = containerRef.current;
    if (!container) return;
    
    // Clear previous content
    container.innerHTML = '';
    elementsRef.current = [];
    
    // Split text based on splitBy option
    let elements: HTMLElement[] = [];
    
    if (splitBy === 'chars') {
      elements = text.split('').map((char) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.display = 'inline-block';
        span.style.position = 'relative';
        container.appendChild(span);
        return span;
      });
    } else if (splitBy === 'words') {
      elements = text.split(/\s+/).map((word) => {
        const span = document.createElement('span');
        span.textContent = word + ' ';
        span.style.display = 'inline-block';
        span.style.position = 'relative';
        container.appendChild(span);
        return span;
      });
    } else if (splitBy === 'lines') {
      // First create temporary spans for each word
      const tempSpans = text.split(/\s+/).map((word) => {
        const span = document.createElement('span');
        span.textContent = word + ' ';
        span.style.display = 'inline-block';
        container.appendChild(span);
        return span;
      });
      
      // Then group spans into lines based on their position
      const lines: HTMLElement[][] = [];
      let currentLine: HTMLElement[] = [];
      let prevTop = tempSpans[0]?.offsetTop;
      
      tempSpans.forEach((span) => {
        if (span.offsetTop !== prevTop) {
          lines.push(currentLine);
          currentLine = [span];
          prevTop = span.offsetTop;
        } else {
          currentLine.push(span);
        }
      });
      
      if (currentLine.length) {
        lines.push(currentLine);
      }
      
      // Clear container again
      container.innerHTML = '';
      
      // Create line spans
      elements = lines.map((lineSpans) => {
        const lineContainer = document.createElement('div');
        lineContainer.style.display = 'block';
        lineContainer.style.position = 'relative';
        
        lineSpans.forEach((span) => {
          lineContainer.appendChild(span);
        });
        
        container.appendChild(lineContainer);
        return lineContainer;
      });
    }
    
    elementsRef.current = elements;
    
    // Set initial state
    gsap.set(elements, { 
      autoAlpha: 0,
      y,
      x,
      scale: scale !== 1 ? scale * 0.8 : 1,
      rotation
    });
    
    // Animation function
    const animate = () => {
      gsap.to(elements, {
        autoAlpha: 1,
        y: 0,
        x: 0,
        scale: 1,
        rotation: 0,
        stagger,
        duration,
        delay,
        ease,
        clearProps: once ? 'all' : 'none'
      });
    };
    
    // Make sure ScrollTrigger is registered if needed
    if (useScrollTrigger && ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
    }
    
    if (useScrollTrigger && ScrollTrigger) {
      // Create ScrollTrigger
      triggerRef.current = ScrollTrigger.create({
        trigger: container,
        start,
        end,
        markers,
        scrub,
        once,
        toggleActions,
        onEnter: animate,
        onEnterBack: !once ? animate : undefined,
        onLeave: !once ? () => {
          gsap.to(elements, {
            autoAlpha: 0,
            y: y / 2,
            x: x / 2,
            scale: scale !== 1 ? scale * 0.9 : 1,
            rotation: rotation / 2,
            stagger: stagger / 2,
            duration: duration / 1.5,
            ease: 'power2.in'
          });
        } : undefined,
        onLeaveBack: !once ? () => {
          gsap.to(elements, {
            autoAlpha: 0,
            y: y / 2,
            x: x / 2,
            scale: scale !== 1 ? scale * 0.9 : 1,
            rotation: rotation / 2,
            stagger: stagger / 2,
            duration: duration / 1.5,
            ease: 'power2.in'
          });
        } : undefined
      });
    } else {
      // Animate immediately
      animate();
    }
    
    // Clean up
    return () => {
      if (triggerRef.current) {
        triggerRef.current.kill();
      }
    };
  }, [
    text, 
    delay, 
    duration, 
    stagger, 
    useScrollTrigger, 
    start, 
    end, 
    scrub,
    markers, 
    once, 
    toggleActions,
    ease,
    y,
    x,
    scale,
    rotation,
    splitBy,
    isClient
  ]);
  
  // If on server side, just return the text without animation
  if (!isClient) {
    return <Component className={cn('inline', className)}>{text}</Component>;
  }
  
  return (
    <Component ref={containerRef} className={cn('inline', className)}>
      {text}
    </Component>
  );
}