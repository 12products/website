import Product from '../types/product'

type Props = {
  product: Product
}

const ProductCard = ({ product }: Props) => {
  return (
    <div
      className="product-card bg-white rounded-2xl p-8 bg-no-repeat"
      style={{
        backgroundImage: 'url(gradient.svg)',
      }}
    >
      <div className="text-sm">{product.month}</div>
      <div className="font-bold text-2xl mt-4">{product.name}</div>
      <div>{product.description}</div>
    </div>
  )
}

export default ProductCard
