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

const getCarts = async () => {
  const localCarts = JSON.parse(window.localStorage.getItem('carts') || '[]')

  return {
    cartItems: localCarts,
    total: localCarts.length,
  }
}

const setCart = async (data: object | undefined) => {
  const { id, added } = data as { id: number; added: boolean }

  const localCarts = JSON.parse(window.localStorage.getItem('carts') || '[]')

  if (added) {
    localCarts.push(items.find((item) => item.id === id))
  } else {
    const index = localCarts.findIndex((item: { id: number }) => item.id === id)
    localCarts.splice(index, 1)
  }

  window.localStorage.setItem('carts', JSON.stringify(localCarts))

  return {}
}

const axios = {
  get: async ({ url, query }: { url: string; query?: object }) => {
    console.log('get', url, query)
    await sleep(3000)

    if (url === '/api/items') return getItems(query)

    if (url === '/api/is_cart_item') return getIsCartItem(query)

    if (url === '/api/cart') return getCarts()

    console.log(url)

    return {}
  },
  post: async ({ url, data }: { url: string; data: object }) => {
    console.log('post', url, data)
    await sleep(1000)

    if (url === '/api/cart') return setCart(data)

    console.log(url)

    return {}
  },
}

export default axios
