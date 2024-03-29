import { Suspense } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import axios from '@/modules/dummyAxios.ts'
import ItemCard from '@/components/common/items/ItemCard.tsx'
import AppSkeleton from '@/components/app/AppSkeleton'
import './ViewItems.scss'

const PageContents = () => {
  const { data: itemInfo } = useSuspenseQuery({
    queryKey: ['items'],
    queryFn: async () => await axios.get({ url: '/api/items' }),
  })

  return (
    <>
      <div className="item-total-info">Total: {itemInfo?.total as number}</div>

      <div className="item-card-wrapper">
        {(itemInfo?.items || []).map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
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
