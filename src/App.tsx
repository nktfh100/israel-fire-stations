import { useEffect } from 'react'
import useAppStore from './stores/appStore'
import './styles/App.scss'
import Map from './components/Map'
import Header from './components/Header'

function App() {

  const storeData = useAppStore((state) => state.data);
  const storeLoad = useAppStore((state) => state.load)

  useEffect(() => {
    if (!storeData || storeData.length == 0) {
      storeLoad();
    }
  }, [storeData, storeLoad]);

  return (
    <div className="App">
      <Header />
      <Map />
    </div>
  )
}

export default App
