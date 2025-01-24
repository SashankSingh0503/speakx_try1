import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './Component/main';
import About from './Component/about';
import Contact from './Component/contact';
import Login from './Component/login';
import Signup from './Component/signup';
import OTPEntry from './Component/otp';
const router = createBrowserRouter([
  
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '*',       
    element: <div>Page not found</div>,
  },
  {
    path: 'about',       
    element: <About/>,
  },
  {
    path: 'contact',       
    element:<Contact/>,
  },
  {
    path: 'login',
    element: <Login/>
  },
  {
    path: 'signup',
    element: <Signup/>
  },
  {
    path: 'otp',
    element: <OTPEntry/>
  },
]);


function App() {
  return <RouterProvider router={router} />;
}

 export default App;
