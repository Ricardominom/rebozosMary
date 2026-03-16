import { useState, useEffect, useMemo } from 'react'
import { products as seedProducts } from '../data/seed'

export function useProducts(filters = {}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const filtered = useMemo(() => {
    let result = seedProducts.filter((p) => p.active)

    if (filters.region) result = result.filter((p) => p.region === filters.region)
    if (filters.material) result = result.filter((p) => p.material === filters.material)
    if (filters.minPrice) result = result.filter((p) => p.price >= filters.minPrice)
    if (filters.maxPrice) result = result.filter((p) => p.price <= filters.maxPrice)

    if (filters.sort === 'price_asc') result = [...result].sort((a, b) => a.price - b.price)
    if (filters.sort === 'price_desc') result = [...result].sort((a, b) => b.price - a.price)
    if (filters.sort === 'newest') result = [...result].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

    return result
  }, [filters.region, filters.material, filters.minPrice, filters.maxPrice, filters.sort])

  return { products: filtered, loading, error }
}

export function useProduct(id) {
  const product = seedProducts.find((p) => p.id === id)
  return { product: product ?? null, loading: false, error: product ? null : 'Producto no encontrado' }
}
