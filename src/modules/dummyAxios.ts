const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const items = [
  { id: 1, name: 'Item 1', description: 'Description 1', price: 10 },
  { id: 2, name: 'Item 2', description: 'Description 2', price: 20 },
  { id: 3, name: 'Item 3', description: 'Description 3', price: 8.4 },
  { id: 4, name: 'Item 4', description: 'Description 4', price: 10.2 },
  { id: 5, name: 'Item 5', description: 'Description 5', price: 10.2 },
  { id: 6, name: 'Item 6', description: 'Description 6', price: 10.2 },
  { id: 7, name: 'Item 7', description: 'Description 7', price: 10.2 },
  { id: 8, name: 'Item 8', description: 'Description 8', price: 10.2 },
  { id: 9, name: 'Item 9', description: 'Description 9', price: 10.2 },
  { id: 10, name: 'Item 10', description: 'Description 10', price: 10.2 },
]

const getItems = (query: object | undefined) => {
  const { page } = (query as { page: number }) || { page: 1 }

  return {
    items: items.slice((page - 1) * 4, page * 4),
    total: 10,
    page,
    perPage: 4,
  }
}

const getIsCartItem = (query: object | undefined) => {
  const { itemIds } = (query as { itemIds: string }) || { itemIds: '' }

  const localCarts = JSON.parse(window.localStorage.getItem('carts') || '[]')

  return itemIds.split(',').map((id) => localCarts.some((item: { id: number }) => item.id === Number(id)))
}

const axios = {
  get: async ({ url, query }: { url: string; query?: object }) => {
    await sleep(3000)

    if (url === '/api/items') return getItems(query)

    if (url === '/api/is_cart_item') return getIsCartItem(query)

    console.log(url)

    return {}
  },
}

export default axios
