import './App.css';
import Dashboard from './Dashboard';
import Landing from './Landing';
import Quiz from './Quiz';

import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path='/' element={<Landing/>} />
    <Route path='/dashboard' element={<Dashboard/>} />
    <Route path='/quiz/:id/' element={<Quiz/>} />
  </>
));

function App() {
  return (
    <RouterProvider router={ router } />
  );
}

export default App;
