import { BrowserRouter, Route, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import {lazy, Suspense} from "react";

const IndexPage = lazy(() => import('./pages/index'));
const ListPage = lazy(() => import('./pages/list'));
const DetailPage = lazy(() => import('./pages/detail'));

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={'loading...'}>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
        </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;

reportWebVitals(console.log);