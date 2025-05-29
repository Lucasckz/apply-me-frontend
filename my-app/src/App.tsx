import { useState } from 'react'
import './App.css'
import Button from './components/Button'
import {ServerStackIcon} from '@heroicons/react/24/solid'
import Card from './components/Card'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
    < div className="card-container">
    <Card
      title="Sample Title"
      description="Sample description for the card."
      downloadLink="#"
      btn={{
        text: "Download",
        filled: true,
        type: "primary",
        href: "#",
      
      }}

    />
   <Button
          text="Select PDF File"

    filled={false}
      type="secondary"
      href="#"
     icon={<ServerStackIcon style={{ width: 24, height: 24 }} />}
    
    />
    
     <Button
          text="Convert to Resume"

    filled={true}
      type="secondary"
      href="#"
     icon={<ServerStackIcon style={{ width: 24, height: 24 }} />}
    
    />
    
    </div>
      
    
      
      
      
       </div>
   
    // <>
    //   <div>
    //     <a href="https://vite.dev" target="_blank" rel="noreferrer">
    //       <img src={viteLogo} className="logo" alt="Vite logo" />
    //     </a>

    //     <a href="https://react.dev" target="_blank" rel="noreferrer">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    //   <h1>Vite + React</h1>
    //   <div className="card">
    //     <button onClick={() => setCount((count) => count + 1)}>
    //       count is {count}
    //     </button>
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to test HMR
    //     </p>
    //   </div>
    //   <p className="read-the-docs">
    //     Click on the Vite and React logos to learn more
    //   </p>
    // </>
  )
}

export default App
