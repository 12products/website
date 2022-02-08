import { GetStaticProps, GetStaticPaths } from 'next'

import Product from '../../types/product'
import { getAllProducts, getProductBySlug } from '../../lib/api'
import markdownToHtml from '../../lib/markdownToHtml'
import Header from '../../components/header'

type ProductPageProps = {
  product: Product
}

// Hack to make Tailwind bring in the styles
const sadness = 'grid grid-cols-4 gap-4'

const Product = ({ product }: ProductPageProps) => {
  return (
    <div className="max-w-7xl mx-auto px-4 pb-8 relative">
      <Header small />

      <section className="max-w-4xl mx-auto mt-16 md:mt-24">
        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mt-40 mb-8 px-8">
          <h1 className="text-6xl">{product.name}</h1>

          <div className="md:flex flex-col items-end">
            <div className="text-xs bg-brand-black rounded text-white px-2 py-1 w-min uppercase font-bold mb-1 hidden md:block">
              {product.month}
            </div>
            <div>{product.description}</div>
          </div>
        </div>

        <div
          className="bg-white rounded-2xl p-8 prose max-w-full text-2xl text-brand-black"
          dangerouslySetInnerHTML={{ __html: product.content }}
        />
      </section>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const product = getProductBySlug(params?.slug as string, [
    'name',
    'month',
    'date',
    'content',
    'description',
  ])

  const content = await markdownToHtml(product.content || '')

  return {
    props: { product: { ...product, content } },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const products = getAllProducts(['slug'])

  return {
    paths: products.map((product) => ({
      params: {
        slug: product.slug,
      },
    })),
    fallback: false,
  }
}

export default Product
