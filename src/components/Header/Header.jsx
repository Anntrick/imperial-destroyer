import './Header.scss'
import { FaUserAstronaut, TbBellRinging } from 'react-icons/all'

export const Header = () => {

    return (
      <header className="Header">
          <h3>Imperial destroyers center</h3>
          <div className='icons'>
            <TbBellRinging />
            <FaUserAstronaut />
          </div>
      </header>
  
  
    )
  
  }