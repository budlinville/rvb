import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './components/pages/Home';
import { PageT, withFlexPage, withPage } from './components/Page';
import { ReactElement } from 'react';


interface PageOptionsT {
    pageType?: PageT,
}


const route = (path: string, component: ReactElement, options: PageOptionsT) => (
    <Route path={ path } Component={
        () => options.pageType === 'page' ? withPage(component) : withFlexPage(component)
    } />
);


const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                { route('/', <Home />, { pageType: 'flex-page'} ) }
            </Routes>
        </BrowserRouter>
    );
};

export default Router;