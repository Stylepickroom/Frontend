import Sidenav from './components/Sidebar/Sidebar';

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
      <Sidenav />
    </div>
  );
}

export default App;
