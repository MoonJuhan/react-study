import { Suspense } from 'react'
import { useSuspenseQuery, useQuery } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { Item } from '@/interfaces'
import dummyAxios from '@/modules/dummyAxios.ts'
import ItemCard from '@/components/common/items/ItemCard.tsx'
import AppSkeleton from '@/components/app/AppSkeleton'
import AppPagnation from '@/components/app/AppPagination'
import './ViewItems.scss'

const useItems = (page: number) =>
  useSuspenseQuery({
    queryKey: ['items', page],
    queryFn: async () => await dummyAxios.get({ url: '/api/items', query: { page } }),
  })

const PageContents = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const page = Number(searchParams.get('page')) || 1

  const navigate = useNavigate()
  const setPage = (newPage: number) => {
    navigate(`/?page=${newPage}`)
  }

  const { data: itemInfo } = useItems(page)

  const itemIds = itemInfo.items.map((item: Item) => item.id).join(',')

  const {
    isLoading,
    data: isCartItems,
    refetch: refetchIsCartItems,
  } = useQuery({
    queryKey: ['isCartItem', itemIds],
    queryFn: async () => await dummyAxios.get({ url: '/api/is_cart_item', query: { itemIds } }),
    enabled: !!itemInfo,
  })

  const getIsCartItemType = (index: number) => {
    if (isLoading) return 'loading'

    if ((isCartItems as { [key: number]: boolean })[index]) return 'true'

    return 'false'
  }

  return (
    <>
      <div className="item-total-info">Total: {itemInfo?.total as number}</div>

      <div className="item-card-wrapper">
        {(itemInfo?.items || []).map((item: Item, index: number) => (
          <ItemCard
            key={item.id}
            item={item}
            isCartItemType={getIsCartItemType(index)}
            refetchIsCartItems={refetchIsCartItems}
          />
        ))}
      </div>

      <AppPagnation
        currentPage={page}
        lastPage={Math.ceil(itemInfo?.total / itemInfo?.perPage)}
        onClickPage={setPage}
      />
    </>
  )
}

const PageSkeletonContents = () => (
  <>
    <AppSkeleton className="item-total-info-skeleton" />

    <div className="item-card-wrapper">
      {[1, 2, 3, 4].map((i) => (
        <AppSkeleton className="item-card-skeleton" key={i} />
      ))}
    </div>

    <AppSkeleton className="pagination-skeleton" />
  </>
)

const ViewItems = () => {
  return (
    <div className="view-items">
      <h1 className="page-title">Items Page</h1>

      <Suspense fallback={<PageSkeletonContents />}>
        <PageContents />
      </Suspense>
    </div>
  )
}

export default ViewItems
