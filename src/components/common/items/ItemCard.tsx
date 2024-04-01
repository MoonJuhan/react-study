import { useState } from 'react'
import { Item } from '@/interfaces'
import dummyAxios from '@/modules/dummyAxios.ts'
import './ItemCard.scss'

const CartButton = ({
  itemId,
  isCartItemType,
  refetchIsCartItems,
}: {
  itemId: number
  isCartItemType: string
  refetchIsCartItems: Function
}) => {
  const [localLoading, setLocalLoading] = useState(false)

  if (localLoading || isCartItemType === 'loading')
    return (
      <button className="item-card-cart-button" disabled>
        Loading...
      </button>
    )

  const added = isCartItemType === 'true'

  const onClickCartButton = async () => {
    setLocalLoading(true)
    await dummyAxios.post({ url: '/api/cart', data: { id: itemId, added: !added } })
    await refetchIsCartItems()
    setLocalLoading(false)
  }

  return (
    <button className="item-card-cart-button" onClick={onClickCartButton}>
      {added ? 'Remove' : 'Add'} Cart
    </button>
  )
}

const ItemCard = ({
  item,
  isCartItemType,
  refetchIsCartItems,
}: {
  item: Item
  isCartItemType: string
  refetchIsCartItems: Function
}) => {
  return (
    <div className="item-card" key={item.id}>
      <CartButton itemId={item.id} isCartItemType={isCartItemType} refetchIsCartItems={refetchIsCartItems} />

      <div className="item-card-image-wrapper">Image</div>
      <span className="item-card-name">{item.name}</span>
      <span className="item-card-price">${item.price}</span>
      <span className="item-card-description">{item.description}</span>
    </div>
  )
}

export default ItemCard
