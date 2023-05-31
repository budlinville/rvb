import { ReactElement } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { PageT, withFlexPage, withPage } from './components/Page';

import Home, { HOME_PATH } from './components/pages/Home';
import About, { ABOUT_PATH } from './components/pages/About';
import Support, { SUPPORT_PATH } from './components/pages/Support';
import Stats, { STATS_PATH } from './components/pages/Stats';
import Settings, { SETTINGS_PATH } from './components/pages/Settings';


interface PageOptionsT {
    pageType?: PageT,
}


const route = (path: string, component: ReactElement, options: PageOptionsT) => {
    const page = options.pageType === 'page' ? withPage : withFlexPage;
    return <Route path={ path } Component={ () => page(component) } />;
};


//----------------------------------------------------------------------------------------------------------------------


const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                { route(HOME_PATH,      <Home />,       { pageType: 'flex-page'}) }
                { route(ABOUT_PATH,     <About />,      { pageType: 'flex-page'}) }
                { route(SUPPORT_PATH,   <Support />,    { pageType: 'flex-page'}) }
                { route(STATS_PATH,     <Stats />,      { pageType: 'flex-page'}) }
                { route(SETTINGS_PATH,  <Settings />,   { pageType: 'flex-page'}) }
            </Routes>
        </BrowserRouter>
    );
};

export default Router;