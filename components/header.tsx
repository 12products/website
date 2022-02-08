import { useState, useEffect, useRef } from 'react'
import classnames from 'classnames'
import Link from 'next/link'

import { useMobile } from '../hooks/use-mobile'

type HeaderProps = {
  small?: boolean
}

const Header = ({ small }: HeaderProps) => {
  const logoTextRef = useRef<HTMLHeadingElement>(null)
  const [logoTextHeight, setLogoTextHeight] = useState<number>(0)
  const { isMobile } = useMobile()
  const isSmall = isMobile || small

  useEffect(() => {
    const logoTextRect = logoTextRef?.current?.getBoundingClientRect()
    if (logoTextRect?.height && !logoTextHeight) {
      setLogoTextHeight(logoTextRect.height)
    }
  }, [logoTextRef, logoTextHeight])

  return (
    <Link href="/">
      <a>
        <div
          className="rounded-2xl text-white lg:text-center relative bg-cover bg-center my-4 md:my-10"
          style={{
            backgroundImage: 'url(/gradient.svg)',
            height: `calc(${isSmall ? 50 : 100}vh - 10rem)`,
            minHeight: '20rem',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute grain h-full w-full mix-blend-multiply opacity-70 rounded-2xl"
          >
            <filter id="noiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" />
            </filter>

            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>

          <h1
            ref={logoTextRef}
            className={classnames(
              'absolute text-brand-black text-center w-full border-brand-black tracking-wide font-logo text-5xl sm:text-7xl md:text-9xl lg:text-massive transition-opacity duration-300 ease-in-out',
              {
                'opacity-0': !logoTextHeight,
              }
            )}
            style={{
              background: `linear-gradient(
          225deg,
          hsl(52deg 99% 62%) 0%,
          hsl(115deg 74% 70%) 14%,
          hsl(173deg 100% 44%) 29%,
          hsl(191deg 100% 48%) 43%,
          hsl(193deg 100% 49%) 57%,
          hsl(188deg 100% 48%) 71%,
          hsl(181deg 100% 46%) 86%,
          hsl(172deg 100% 48%) 100%
        )`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              bottom: `-${logoTextHeight / 2.8}px`,
            }}
          >
            12products
          </h1>
        </div>
      </a>
    </Link>
  )
}

export default Header
