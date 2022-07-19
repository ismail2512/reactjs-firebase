import './App.css';
import SaveData from './components/save/SaveData';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DataList from './components/view/DataList';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SaveData />} />
          <Route path="Data-List" element={<DataList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
