import './ItemCard.scss'

interface Item {
  id: number
  name: string
  description: string
  price: number
}

const ItemCard = ({ item }: { item: Item }) => {
  const added = true

  const onClickCartButton = () => {
    console.log({ id: item.id, added: !added })
  }

  return (
    <div className="item-card" key={item.id}>
      <button className="item-card-cart-button" onClick={onClickCartButton}>
        {added ? 'Remove' : 'Add'} Cart
      </button>
      <div className="item-card-image-wrapper">Image</div>
      <span className="item-card-name">{item.name}</span>
      <span className="item-card-price">${item.price}</span>
      <span className="item-card-description">{item.description}</span>
    </div>
  )
}

export default ItemCard
