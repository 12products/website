import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const productsDirectory = join(process.cwd(), 'data/products')

export function getProductSlugs() {
  return fs.readdirSync(productsDirectory)
}

export function getProductBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(productsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  type Items = {
    [key: string]: string
  }

  const items: Items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllProducts(fields: string[] = []) {
  const slugs = getProductSlugs()

  const products = slugs
    .map((slug) => getProductBySlug(slug, fields))
    .sort((product1, product2) => (product1.date > product2.date ? -1 : 1))
  return products
}
