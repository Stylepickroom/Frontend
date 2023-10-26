import { Button } from '@mui/material';

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
      <h1>Crafted with 💜 by Lucif3r-in</h1>
      <Button color='secondary'>Secondary</Button>
      <Button variant='contained' color='success'>
        Success
      </Button>
      <Button variant='outlined' color='error'>
        Error
      </Button>
    </div>
  );
}

export default App;
