'use client'

// /context/CartContext.tsx
import React, { createContext, useCallback,useContext, useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { v4 as uuidv4 } from 'uuid'
import { setCookie, getCookie } from 'cookies-next'

interface ProductInfo {
  image: string
  product_name: string
  description: string
  price: number
}

interface CartItem extends ProductInfo {
  productId: string
  count: number
}

interface Cart {
  count: number
  items: CartItem[]
}

interface CartContextType {
  cart: Cart
  addToCart: (count: number, productId: string, productInfo: ProductInfo) => {
    newCount: number
    existingItem?: CartItem
  }
  calculateSubtotal: () => number
  updateItemCount: (productId: string, newCount: number) => {
    updatedItems: CartItem[]
    currentCount: number
  }
  undoRemove: (productId: string) => void
  resetCart: () => void
}

const userId = getCookie('userId') || uuidv4()
setCookie('userId', userId)

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const userId = getCookie('userId') as string
  const [cart, setCart] = useState<Cart>({ count: 0, items: [] })
  const [removedItems, setRemovedItems] = useState<CartItem[]>([])
  const [isResetCart, SetIsResetCart] = useState(false)

  const CookiesUpdate = useCallback(async () => {
    await supabase
      .from('cookies')
      .update({
        cart: cart,
      })
      .eq('id', userId)
      .select('cart')
  }, [cart, userId])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('cookies')
          .select('cart')
          .eq('id', userId)

        if (error) throw error

        if (!data?.length) {
          await supabase.from('cookies').upsert([
            {
              id: userId,
              cart: { count: 0, items: [] },
            },
          ])
        }

        const initialCart = data?.[0]?.cart || { count: 0, items: [] }
        setCart(initialCart)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [userId])

  useEffect(() => {
    if (cart.items.length > 0 || removedItems.length > 0 || isResetCart) {
      CookiesUpdate()
    }
  }, [cart, removedItems, isResetCart, CookiesUpdate])

  const addToCart = (count: number, productId: string, productInfo: ProductInfo) => {
    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId === productId
    )

    const existingRemovedItemIndex = removedItems.findIndex(
      (item) => item.productId === productId
    )

    if (existingRemovedItemIndex !== -1) {
      const updatedRemovedItems = [...removedItems]
      updatedRemovedItems.splice(existingRemovedItemIndex, 1)
      setRemovedItems(updatedRemovedItems)
    }

    if (existingItemIndex !== -1) {
      const existingItem = cart.items[existingItemIndex]
      const newCount = Math.min(existingItem.count + count, 10)

      const updatedItems = [...cart.items]
      updatedItems[existingItemIndex] = { ...existingItem, count: newCount }

      setCart({
        count: cart.count + (newCount - existingItem.count),
        items: updatedItems,
      })

      return { newCount, existingItem }
    }

    setCart({
      count: cart.count + count,
      items: [
        ...cart.items,
        {
          productId,
          count,
          ...productInfo,
        },
      ],
    })

    return { newCount: count }
  }

  const updateItemCount = (productId: string, newCount: number) => {
    const updatedItems = cart.items
      .map((item) => {
        if (item.productId === productId) {
          const currentCount = item.count
          const newTotalCount = Math.min(
            Math.max(currentCount + newCount, 0),
            10
          )
          if (newTotalCount === 0) {
            setRemovedItems((prevRemovedItems) => [...prevRemovedItems, item])
            CookiesUpdate()
            return null
          }
          return { ...item, count: newTotalCount }
        }
        return item
      })
      .filter((item): item is CartItem => item !== null)

    const updatedCount = updatedItems.reduce(
      (total, item) => total + item.count,
      0
    )

    setCart({
      count: updatedCount,
      items: updatedItems,
    })

    const currentItem = cart.items.find((item) => item.productId === productId)
    const currentCount = currentItem ? currentItem.count : 0

    return { updatedItems, currentCount }
  }

  const undoRemove = (productId: string) => {
    setRemovedItems((prevRemovedItems) => {
      const removedItemIndex = prevRemovedItems.findIndex(
        (item) => item.productId === productId
      )

      if (removedItemIndex !== -1) {
        const [removedItem] = prevRemovedItems.splice(removedItemIndex, 1)

        setCart((prevCart) => {
          const updatedItems = [...prevCart.items, removedItem]
          const updatedCount = updatedItems.reduce(
            (total, item) => total + item.count,
            0
          )

          return {
            count: updatedCount,
            items: updatedItems,
          }
        })
      }

      return [...prevRemovedItems]
    })
  }

  const calculateSubtotal = (): number => {
    return cart.items.reduce(
      (total, item) => total + item.price * item.count,
      0
    )
  }

  const resetCart = () => {
    setCart({ count: 0, items: [] })
    SetIsResetCart(true)
  }

  const value: CartContextType = {
    cart,
    addToCart,
    calculateSubtotal,
    updateItemCount,
    undoRemove,
    resetCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}