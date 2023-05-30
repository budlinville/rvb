import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './components/pages/Home';
import { withPage } from './components/Page';
import { ReactElement } from 'react';


const route = (path: string, component: ReactElement) => (
    <Route path={ path } Component={ () => withPage(component) } />
);


const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                { route('/', <Home /> ) }
            </Routes>
        </BrowserRouter>
    );
};

export default Router;