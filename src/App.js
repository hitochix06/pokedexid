import NavBar from './components/NavBar';
import Card from './components/Card';
import Search from './components/Search';


function App() {
  return (
    <div style={{background: 'black', minHeight: '100vh', color: 'white'}}>
      <NavBar />
      <Search />
      <Card />
    </div>


  );
}

export default App;
