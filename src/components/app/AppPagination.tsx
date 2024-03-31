import { JSX } from 'react/jsx-runtime'
import './AppPagination.scss'

interface Props {
  currentPage: number
  lastPage: number
  onClickPage: Function
  wingLength?: number
}

const AppPagnation = ({ currentPage, lastPage, onClickPage, wingLength = 2 }: Props) => {
  const pageButtons: JSX.Element[] = []

  const pageButton = (page: number) => (
    <button
      className={`pagination-button ${page === currentPage ? 'selected' : ''}`}
      onClick={() => onClickPage(page)}
      key={page}
    >
      {page}
    </button>
  )

  const setPageButton = (page: number) => {
    if (page === 1 || page === lastPage || (page >= currentPage - wingLength && page <= currentPage + wingLength)) {
      pageButtons.push(pageButton(page))
      return
    }

    if (page === currentPage - wingLength - 1 || page === currentPage + wingLength + 1) {
      pageButtons.push(
        <div className="pagination-ellipsis" key={page}>
          ...
        </div>,
      )
    }
  }

  for (let i = 1; i <= lastPage; i += 1) {
    setPageButton(i)
  }

  return <div className="app-pagination">{pageButtons}</div>
}

export default AppPagnation
