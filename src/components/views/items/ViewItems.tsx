import { Suspense } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router-dom'
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
  const page = Number(searchParams.get('page'))

  const navigate = useNavigate()
  const setPage = (newPage: number) => {
    navigate(`/?page=${newPage}`)
  }

  const { data: itemInfo } = useItems(page)

  return (
    <>
      <div className="item-total-info">Total: {itemInfo?.total as number}</div>

      <div className="item-card-wrapper">
        {(itemInfo?.items || []).map((item) => (
          <ItemCard key={item.id} item={item} />
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
