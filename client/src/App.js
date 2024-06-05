import './App.scss'; // Импортирует стили 
// Импортируем компоненты
import Header from './components/Header'; 
import Banner from './components/Banner'; 
import Info from './components/Info'; 
import Video from './components/Video'; 
import Instructions from './components/Instructions'; 
import Main from './components/Main'; 

// Главный компонент
function App() {
  return (
    <>
      <Header /> 
      <Banner />
      <Info /> 
      <Video />
      <Instructions /> 
      <Main /> 
    </>
  );
}

export default App; // Экспортируем App
