import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'

import { Planets } from './containers/Planets/Planets'
import { Starships } from './containers/Starships/Starships'
import { SideMenu } from './components/SideMenu/SideMenu'

const App = () => {
 
  return (
      <div className="App ">
        <BrowserRouter>
          <Header />
          <SideMenu/>
          <Routes>
            <Route path="/" element={<Planets />} />
            <Route path="/starships" element={<Starships />} />

          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
  );
}

export default App
