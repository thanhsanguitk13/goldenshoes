
import { ShoeList } from './components/ShoeList'
import { Cart } from './components/Cart'
import './App.css'

function App() {

  return (
    <div className="mainContent flex md:flex justify-between">
     <ShoeList/>
     <Cart/>
    </div>
  )
}

export default App