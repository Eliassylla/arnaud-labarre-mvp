# GSAP Animation Guide

This guide documents the GSAP integration in the project, providing examples and best practices.

## Basic Usage

GSAP is properly configured for Next.js and can be used in any client-side component:

```tsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

export default function AnimatedComponent() {
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!elementRef.current) return;
    
    gsap.to(elementRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out'
    });
  }, []);
  
  return (
    <div ref={elementRef} className="opacity-0 translate-y-4">
      I will animate in!
    </div>
  );
}
```

## Available Components

### SmoothScrollWrapper

Provides smooth page scrolling using GSAP ScrollSmoother:

```tsx
import { SmoothScrollWrapper } from '@/components/layout/SmoothScrollWrapper';

export default function Layout({ children }) {
  return (
    <SmoothScrollWrapper smoothness={1} speed={1}>
      {children}
    </SmoothScrollWrapper>
  );
}
```

### ScrollReveal

Animate elements as they scroll into view:

```tsx
import { ScrollReveal } from '@/components/animation/ScrollReveal';

export default function Section() {
  return (
    <ScrollReveal 
      direction="up" 
      distance={30} 
      duration={0.8}
      stagger={0.1}
    >
      <div>First item</div>
      <div>Second item</div>
      <div>Third item</div>
    </ScrollReveal>
  );
}
```

### TextReveal

Animate text character by character:

```tsx
import { TextReveal } from '@/components/animation/TextReveal';

export default function Headline() {
  return (
    <TextReveal 
      text="Animated headline text" 
      as="h2"
      stagger={0.02}
      duration={0.05}
    />
  );
}
```

## Available Hooks

### useSmoothScroll

Enables smooth scrolling to elements:

```tsx
'use client';

import { useSmoothScroll } from '@/lib/gsap';

export default function NavLink() {
  const { smoothScrollTo } = useSmoothScroll();
  
  const handleClick = () => {
    smoothScrollTo({ 
      targetId: 'contact-section',
      offset: -50, 
      duration: 1 
    });
  };
  
  return (
    <button onClick={handleClick}>
      Contact Us
    </button>
  );
}
```

### useBasicAnimations

Provides simple animation utilities:

```tsx
'use client';

import { useBasicAnimations } from '@/lib/gsap';

export default function AnimatedSection() {
  const { containerRef, fadeIn, scrollReveal } = useBasicAnimations();
  
  useEffect(() => {
    // Fade in elements when component mounts
    fadeIn('.item', { y: 30, stagger: 0.1 });
    
    // Reveal elements on scroll
    scrollReveal('.scroll-item', { 
      y: 50, 
      trigger: containerRef.current,
      start: 'top 80%'
    });
  }, [fadeIn, scrollReveal]);
  
  return (
    <div ref={containerRef}>
      <div className="item">Item 1</div>
      <div className="item">Item 2</div>
      
      <div className="scroll-item">Scroll Item 1</div>
      <div className="scroll-item">Scroll Item 2</div>
    </div>
  );
}
```

## Best Practices

1. **Always use the 'use client' directive** when using GSAP in a component.

2. **Import from our setup**: Always import GSAP from `@/lib/gsap` rather than directly from the gsap package.

3. **Clean up animations** in useEffect's return function to prevent memory leaks:
   ```tsx
   useEffect(() => {
     const animation = gsap.to(...);
     
     return () => {
       animation.kill();
     };
   }, []);
   ```

4. **Handle SSR properly**: Use the ClientOnly component or useEffect hooks to ensure GSAP only runs on the client.

5. **Performance**: Minimize the number of animations and use batching when possible:
   ```tsx
   // Good
   gsap.to([element1, element2, element3], {...})
   
   // Less efficient
   gsap.to(element1, {...})
   gsap.to(element2, {...})
   gsap.to(element3, {...})
   ```

6. **Mobile optimization**: Consider disabling or simplifying animations on mobile:
   ```tsx
   const isMobile = window.innerWidth < 768;
   if (!isMobile) {
     // Run complex animations
   } else {
     // Run simpler animations or none
   }
   ```