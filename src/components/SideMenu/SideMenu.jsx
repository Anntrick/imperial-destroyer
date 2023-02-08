import './SideMenu.scss'
import logo from '../../assets/menu-image.jpg'

import { BiPlanet, SiStarship } from 'react-icons/all'
import { Link, useLocation } from 'react-router-dom'

export const SideMenu = () => {
  const location = useLocation()

  return (
    <aside className="SideMenu">
      <div className='image'>
        <img src={logo} alt='logo' />
      </div>
      <div className='menu'>
        <ul>
            <li>
              <Link to="/" className={location.pathname === '/' ? "active" : ""}>
                <BiPlanet/>
                <span className='label'>Planets</span>
              </Link>
            </li>
            <li>
              <Link to="/starships" className={location.pathname === '/starships' ? "active" : ""}>
                <SiStarship/>
                <span className='label'>Starships</span>
              </Link>
            </li>
        </ul>
      </div>
    </aside>


  )

}