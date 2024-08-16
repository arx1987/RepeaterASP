import { useKeyPress } from '../../services/useKeyPress'

const Test2 = () => {
  const isJapanPressed = useKeyPress('j')
  const isChinaPressed = useKeyPress('c')
  const isSouthKoreaPressed = useKeyPress('k')
  const isAustraliaPressed = useKeyPress('a')
  
  return (
    <div className='App'>
        <div>Нажми j c k или a</div>
	  {isJapanPressed && <div>Japan</div>}
	  {isChinaPressed && <div>China</div>}
	  {isSouthKoreaPressed && <div>Korea</div>}
	  {isAustraliaPressed && <div>Australia</div>}
	</div>
  )
};

export default Test2;