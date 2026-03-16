import { useState } from 'react'
import { supabase } from '../lib/supabase'

export function useOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchOrders = async (customerId) => {
    setLoading(true)
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*, products(*))')
      .eq('customer_id', customerId)
      .order('created_at', { ascending: false })
    if (!error) setOrders(data)
    setLoading(false)
  }

  return { orders, loading, fetchOrders }
}
