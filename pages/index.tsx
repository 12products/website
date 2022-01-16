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

type Props = {
  products: Product[]
}

const Home = ({ products }: Props) => {
  const [nextStreamText, setNextStreamText] = useState('')

  useEffect(() => {
    const counter = setInterval(() => {
      const today = new Date()
      const nextStream = isSunday(today) ? today : nextSunday(today)
      nextStream.setHours(12, 0, 0)

      setNextStreamText(
        formatDuration(
          intervalToDuration({
            start: new Date(),
            end: nextStream,
          }),
          {
            format: ['days', 'hours', 'minutes', 'seconds'],
          }
        )
      )
    }, 1000)
    return () => clearInterval(counter)
  }, [])

  const streamLink = `Next stream in ${nextStreamText}`

  return (
    <div className="max-w-7xl mx-auto px-4 pb-8 relative">
      <Head>
        <title>12products</title>
      </Head>

      {nextStreamText && (
        <div className="absolute -top-8 text-center w-full font-bold">
          <span>🚨 </span>
          <Link href="https://twitch.tv/12products">
            <a className="mx-10">{streamLink}</a>
          </Link>
          <span>🚨 </span>
        </div>
      )}

      <header
        className="rounded-2xl text-white lg:text-center relative bg-cover bg-center my-10"
        style={{
          backgroundImage: 'url(gradient.svg)',
          height: `calc(100vh - 10rem)`,
          minHeight: '20rem',
        }}
      >
        <Image
          src="/grain.png"
          alt="grain"
          className="absolute grain h-full w-full mix-blend-multiply"
          layout="fill"
          priority
        />

        <h1
          className="absolute text-brand-black text-center w-full border-brand-black tracking-wide font-logo"
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
            fontSize: '12rem',
            bottom: '-7.25rem',
          }}
        >
          12products
        </h1>
      </header>

      <main className="mt-72">
        <section className="max-w-4xl mx-auto bg-white rounded-2xl p-8 text-2xl relative flex flex-col justify-center items-center">
          <div className="absolute -top-32">
            <Image
              src="/alice.png"
              alt="Memoji of Alice"
              height={250}
              width={250}
              className="rotate-6 -mr-4"
            />

            <Image
              src="/anthony.png"
              alt="Memoji of Anthony"
              height={250}
              width={250}
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

        <section className="max-w-4xl mx-auto mt-28 space-y-8">
          <h2 className="text-6xl">Products</h2>

          <div>
            {products.map((product) => (
              <ProductCard key={product.name} product={product} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home

export const getStaticProps = async () => {
  const products = getAllProducts(['name', 'date', 'month', 'description'])

  return {
    props: { products },
  }
}
