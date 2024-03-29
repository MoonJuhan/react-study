import './AppSkeleton.scss'

const AppSkeleton = ({ className }: { className: string }) => {
  return (
    <div className={`app-skeleton ${className}`}>
      <div className="bar-wrapper">
        <div className="bar" />
      </div>
    </div>
  )
}

export default AppSkeleton
