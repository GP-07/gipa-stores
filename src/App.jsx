import './App.css';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';

function App() {
  const sectionToShow = (section) => {
    switch(section) {
      case "FeaturedProducts": return <ItemListContainer />
      case "ProductDetail": return <ItemDetailContainer />
      default: return <ItemListContainer />
    }
  }
  return (
    <>
      <NavBar />
      {
        sectionToShow("ProductDetail")
      }
    </>
  );
}

export default App;
