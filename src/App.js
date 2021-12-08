import logo from './logoshecodes.png';
import './App.css';
import Dictionary from "./Dictionary";

function App() {
  return (
    <div className="App">
      <div className="container">
      <header className="App-header">
      <img  src={logo} className="App-logo img-fluid"
      alt="logo" />
     </header>
     <main>
       <Dictionary />
       </main> 
     </div>
     <footer className="App-footer">
       <small>Coded by PinkPhi</small>
     </footer>
    </div>
  );
}

export default App;
