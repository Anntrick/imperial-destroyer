import './SideMenu.scss'
import logo from '../../assets/menu-image.jpg'

import { Link } from 'react-router-dom'
import { useState } from 'react'

export const SideMenu = () => {

  const [activeIndex, setActiveIndex] = useState(0)

  const menuItems = [
    {
      title: 'Planets',
      path: '/'
    },
    {
      title: 'Starships',
      path: '/starships'
    }
  ]

  return (
    <aside className="SideMenu">
      <div className='image'>
        <img src={logo} alt='logo' />
      </div>

      <div className='menu'>
        <ul>
          {menuItems.map((menuItem, index) => (
            <li key={menuItem.title}>
              <Link to={menuItem.path} className={activeIndex === index ? "active" : ""} onClick={() => setActiveIndex(index)}>
                {menuItem.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>


  )

}