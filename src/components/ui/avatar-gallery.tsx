"use client"

import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'
import Image from 'next/image'
import { gsap } from '@/lib/gsap/gsap-config'
import { Avatar } from './avatar'

type AvatarGalleryProps = {
  images: string[]
  alt?: string
  className?: string
  interval?: number
}

export function AvatarGallery({ 
  images, 
  alt = "Image", 
  className, 
  interval = 3000 
}: AvatarGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [nextIndex, setNextIndex] = useState(1)
  const [isClient, setIsClient] = useState(false)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const currentImageRef = useRef<HTMLDivElement>(null)
  const nextImageRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const intervalIdRef = useRef<number | null>(null)
  
  // Set client-side flag
  useEffect(() => {
    setIsClient(true)
    return () => {
      if (intervalIdRef.current !== null) {
        window.clearInterval(intervalIdRef.current)
      }
      if (timelineRef.current) {
        timelineRef.current.kill()
      }
    }
  }, [])
  
  useLayoutEffect(() => {
    if (!isClient) return
    
    // Create a GSAP context for proper cleanup
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(currentImageRef.current, { autoAlpha: 1, scale: 1 })
      gsap.set(nextImageRef.current, { autoAlpha: 0, scale: 1.05 })
      
      // Create a transition timeline
      const createTransition = () => {
        // Kill previous timeline if it exists
        if (timelineRef.current) {
          timelineRef.current.kill()
        }
        
        const tl = gsap.timeline({
          paused: true,
          onComplete: rotateImages
        })
        
        // Simultaneous fade out current and fade in next
        tl.to(currentImageRef.current, { 
          autoAlpha: 0, 
          scale: 0.95,
          duration: 0.8,
          ease: "power1.inOut"
        }, 0)
        
        tl.to(nextImageRef.current, { 
          autoAlpha: 1, 
          scale: 1,
          duration: 0.8,
          ease: "power1.inOut"
        }, 0)
        
        timelineRef.current = tl
        return tl
      }
      
      // Function to update indices and reset image positions
      const rotateImages = () => {
        const newCurrentIndex = (currentIndex + 1) % images.length
        setCurrentIndex(newCurrentIndex)
        setNextIndex((newCurrentIndex + 1) % images.length)
        
        // Reset positions for next transition
        gsap.set(currentImageRef.current, { autoAlpha: 1, scale: 1 })
        gsap.set(nextImageRef.current, { autoAlpha: 0, scale: 1.05 })
      }
      
      // Start the rotation interval
      const startRotation = () => {
        if (intervalIdRef.current !== null) {
          window.clearInterval(intervalIdRef.current)
        }
        
        // Create and play the first transition after interval
        const id = window.setInterval(() => {
          const tl = createTransition()
          tl.play()
        }, interval)
        
        intervalIdRef.current = id
      }
      
      startRotation()
      
    }, containerRef)
    
    return () => ctx.revert() // Cleanup all GSAP animations
  }, [isClient, currentIndex, nextIndex, images.length, interval])
  
  // Handle the first render and SSR
  if (!isClient || images.length === 0) {
    return (
      <Avatar className={className}>
        <div className="w-full h-full overflow-hidden rounded-full">
          <Image
            src={images[0] || '/images/placeholder.jpg'}
            alt={alt}
            width={300}
            height={300}
            className="object-cover w-full h-full"
            priority
          />
        </div>
      </Avatar>
    )
  }
  
  return (
    <Avatar className={className}>
      <div 
        ref={containerRef} 
        className="w-full h-full rounded-full overflow-hidden avatar-gallery gsap-container"
        data-gsap-animated="true"
      >
        <div 
          ref={currentImageRef}
          className="absolute inset-0 w-full h-full avatar-gallery-image"
        >
          <Image
            src={images[currentIndex]}
            alt={`${alt} ${currentIndex + 1}`}
            width={300}
            height={300}
            className="object-cover w-full h-full"
            unoptimized
          />
        </div>
        <div 
          ref={nextImageRef}
          className="absolute inset-0 w-full h-full avatar-gallery-image"
          style={{ opacity: 0 }}
        >
          <Image
            src={images[nextIndex]}
            alt={`${alt} ${nextIndex + 1}`}
            width={300}
            height={300}
            className="object-cover w-full h-full"
            unoptimized
          />
        </div>
      </div>
    </Avatar>
  )
} 