export interface Database {
    public: {
      Tables: {
        products: {
          Row: {
            id: string
            product_name: string
            description: string | null
            price: number
            image: string | null
            category: string | null
            height: number | null
            width: number | null
            date_added: string
          }
          Insert: {
            id?: string
            product_name: string
            description?: string | null
            price: number
            image?: string | null
            category?: string | null
            height?: number | null
            width?: number | null
            date_added?: string
          }
        }
        orders: {
          Row: {
            id: string
            transaction_id: string
            user_id: string
            total_price: number
            status: string
            created_at: string
          }
        }
        // Add other table types...
      }
    }
  }