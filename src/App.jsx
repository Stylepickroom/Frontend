import OverviewCard from './Components/Overview/Card';
import './App.css';

function App() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <OverviewCard />
    </div>
  );
}

export default App;
