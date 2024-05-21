import { BrowserRouter, Route, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import {lazy, Suspense} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const IndexPage = lazy(() => import('./pages/index'));
const ListPage = lazy(() => import('./pages/list'));
const DetailPage = lazy(() => import('./pages/detail'));

const queryClient = new QueryClient()

const App = () => {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense fallback={'loading...'}>
            <Routes>
              <Route path="/" element={<IndexPage />} />
              <Route path="/list" element={<ListPage />} />
              <Route path="/detail/:id" element={<DetailPage />} />
            </Routes>
          </Suspense>
      </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;

reportWebVitals(console.log);