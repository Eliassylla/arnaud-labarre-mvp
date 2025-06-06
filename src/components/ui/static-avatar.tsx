"use client"

import React from 'react'
import Image from 'next/image'
import { Avatar } from './avatar'

type StaticAvatarProps = {
  src?: string
  alt?: string
  className?: string
  priority?: boolean
}

/**
 * A simplified Avatar component that displays a single static image
 * without any cycling or animations.
 */
export function StaticAvatar({ 
  src = '/images/atelier-menuiserie-2.webp', // Default image
  alt = "Avatar",
  className,
  priority = false
}: StaticAvatarProps) {
  return (
    <Avatar className={className}>
      <div className="w-full h-full overflow-hidden rounded-full">
        <Image
          src={src}
          alt={alt}
          width={300}
          height={300}
          className="object-cover w-full h-full"
          priority={priority}
          unoptimized={false}
        />
      </div>
    </Avatar>
  )
} 