import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  nextSunday,
  formatDuration,
  intervalToDuration,
  isSunday,
} from 'date-fns'

import ProductCard from '../components/product-card'
import { getAllProducts } from '../lib/api'
import Product from '../types/product'
import { useMobile } from '../hooks/use-mobile'
import Header from '../components/header'
import { BRAND_COLORS } from '../lib/util'

type Props = {
  products: Product[]
  nextStreamText: string
}

const getNextStreamText = () => {
  const today = new Date()
  const nextStream = isSunday(today) ? today : nextSunday(today)
  nextStream.setHours(12, 0, 0)

  return formatDuration(
    intervalToDuration({
      start: new Date(),
      end: nextStream,
    }),
    {
      format: ['days', 'hours', 'minutes', 'seconds'],
    }
  )
}

const Home = ({ products, nextStreamText: defaultNextStreamText }: Props) => {
  const [nextStreamText, setNextStreamText] = useState(defaultNextStreamText)
  const { isMobile } = useMobile()

  useEffect(() => {
    const counter = setInterval(() => {
      setNextStreamText(getNextStreamText())
    }, 1000)
    return () => clearInterval(counter)
  }, [])

  const streamLink = `Next stream in ${nextStreamText}`

  return (
    <div className="max-w-7xl mx-auto px-4 pb-12 relative">
      <Head>
        <title>12products</title>
      </Head>

      {!isMobile && nextStreamText && (
        <div className="absolute -top-8 text-center w-full font-bold">
          <span>🚨 </span>
          <Link href="https://twitch.tv/12products">
            <a className="mx-10">{streamLink}</a>
          </Link>
          <span>🚨 </span>
        </div>
      )}

      <Header />

      <main className="mt-40 md:mt-72">
        <section className="max-w-4xl mx-auto bg-white rounded-2xl p-8 text-2xl relative flex flex-col justify-center items-center prose text-brand-black">
          <div className="absolute -top-24 md:-top-32 flex">
            <Image
              src="/alice.png"
              alt="Memoji of Alice"
              height={isMobile ? 200 : 250}
              width={isMobile ? 200 : 250}
              className="rotate-6 -mr-4"
            />

            <Image
              src="/anthony.png"
              alt="Memoji of Anthony"
              height={isMobile ? 200 : 250}
              width={isMobile ? 200 : 250}
              className="-rotate-6 -ml-4"
            />
          </div>

          <div className="mt-28 space-y-8">
            <p>
              Meet{' '}
              <Link href="https://alicezhao.com/">
                <a>Alice</a>
              </Link>{' '}
              and{' '}
              <Link href="https://anthonymorris.dev">
                <a>Anthony</a>
              </Link>
              .
            </p>

            <p>
              In 2022, they&apos;re building 12 products.{' '}
              <strong>One product a month.</strong>
            </p>

            <p>Why? Because they&apos;re ludicrous.</p>

            <p>
              Just kidding. It&apos;s an effort to develop their programming,
              design, and product thinking skills. Oh, and they just love
              building things!
            </p>

            <p className="text-sm  font-bold">
              Ps. Everything will be{' '}
              <Link href="https://github.com/12products">
                <a>built in public</a>
              </Link>{' '}
              so you can join the fun!
            </p>
          </div>
        </section>

        <section className="max-w-4xl mx-auto mt-16 md:mt-24 space-y-8">
          <h2 className="text-6xl ml-8">Products</h2>

          <div className="md:grid grid-cols-2 gap-8">
            {products.map((product, index) => (
              <ProductCard
                key={product.name}
                product={product}
                color={BRAND_COLORS[index % BRAND_COLORS.length]}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home

export const getStaticProps = async () => {
  const products = getAllProducts([
    'slug',
    'name',
    'date',
    'month',
    'description',
  ])
  const nextStreamText = getNextStreamText()

  return {
    props: { products, nextStreamText },
  }
}
