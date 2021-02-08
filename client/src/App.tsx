import './App.css'
import { PlayerForm } from '@components'

const App: React.FunctionComponent = () => {
  return (
    <div className="App">
      <div className="title-container">
        <h1>Destroy Da One Ring</h1>
        <img
          width="200px"
          src="https://www.pikpng.com/pngl/m/403-4036833_lord-of-the-rings-eye-of-sauron-tower.png"
          alt="Ring"
        />
      </div>

      <PlayerForm />
    </div>
  )
}

export default App
