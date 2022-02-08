import Link from 'next/link'

import { BACKGROUND_COLORS, HOVER_SHADOW_COLORS } from '../lib/util'

import Product from '../types/product'

type Props = {
  product: Product
  color: string
}

const ProductCard = ({ product, color }: Props) => {
  return (
    <Link href={`/product/${product.slug}`}>
      <a>
        <div
          className={`bg-brand-black rounded-2xl h-48 p-8 text-white flex justify-between items-end hover:-translate-y-2 hover:shadow-2xl ${HOVER_SHADOW_COLORS[color]} transition-all duration-300 ease-in-out`}
        >
          <div className="font-bold text-2xl mt-4">{product.name}</div>

          <div className="flex flex-col items-end">
            <div
              className={`text-xs ${BACKGROUND_COLORS[color]} rounded text-brand-black px-2 py-1 w-min uppercase font-bold mb-1`}
            >
              {product.month}
            </div>
            <div className="text-sm">{product.description}</div>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default ProductCard
