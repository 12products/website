import { useState, useEffect } from 'react'

export const useMobile = () => {
  const [width, setWidth] = useState<number | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    function handleWindowSizeChange() {
      setWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleWindowSizeChange)

    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [])

  return {
    isMobile: width && width <= 768,
  }
}
