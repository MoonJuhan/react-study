import { Link } from 'react-router-dom'
import './AppHeader.scss'

const AppHeader = () => {
  return (
    <header className="app-header">
      <div className='app-header-title'>Shop Service</div>

      <div className="links-wrapper">
        <Link to="/">Items</Link>
        <Link to="/cart">Cart</Link>
      </div>
    </header>
  )
}

export default AppHeader
