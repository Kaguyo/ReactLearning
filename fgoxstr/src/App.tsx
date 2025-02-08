import './assets/styles/App.css'
import { SignUp } from './SignUp'
import { useState } from 'react'
import HertaStealthSrc from './assets/icons/HertaStealthing.png'
import HertaActionSrc from './assets/icons/HertaThinking1.png'

export function App() {
    const [HertaStealth, setHertaFace] = useState(HertaStealthSrc)
    const [HertaAction, setHertaAction] = useState(HertaActionSrc)
    
    
    return (
    <>
      <SignUp imageSource={HertaStealth} animationSource={HertaAction}
      setHertaFace={setHertaFace} setHertaAction={setHertaAction}/>
    </>
  )
}
