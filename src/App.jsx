import './App.css'
import PlayersBoard from './components/PlayersBoard'
import LeadingPlayersPanel from './components/LeadingPlayersPanel';

function App() {
  const init = () => {
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify({}));
    }
  };

  init();

  return (
    <>
      <h1 className='gameTitle'>Get To 100</h1>
      <LeadingPlayersPanel />
      <PlayersBoard />
    </>
  );
}

export default App;