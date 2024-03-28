import { useEffect } from 'react'
import ItemCard from '@/components/common/items/ItemCard.tsx'
import './ViewItems.scss'

const ViewItems = () => {
  useEffect(() => {
    console.log('Mounted')

    return () => {
      console.log('Unmounted')
    }
  }, [])

  const itemInfo = {
    items: [
      { id: 1, name: 'Item 1', description: 'Description 1', price: 10 },
      { id: 2, name: 'Item 2', description: 'Description 2', price: 20 },
      { id: 3, name: 'Item 3', description: 'Description 3', price: 8.4 },
      { id: 4, name: 'Item 4', description: 'Description 4', price: 10.2 },
    ],
    total: 10,
    page: 1,
    perPage: 4,
  }

  return (
    <div className="view-items">
      <h1 className="page-title">Items Page</h1>
      <div className="item-total-info">Total: {itemInfo.total}</div>
      <div className="item-card-wrapper">
        {itemInfo.items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

export default ViewItems
