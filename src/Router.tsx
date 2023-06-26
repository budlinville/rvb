import { ReactElement, ComponentType } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { withAuthenticator } from '@aws-amplify/ui-react';

import { PageT, withFlexPage, withPage } from './components/Page';

import Home, { HOME_PATH } from './components/pages/Home';
import About, { ABOUT_PATH } from './components/pages/About';
import Support, { SUPPORT_PATH } from './components/pages/Support';
import Stats, { STATS_PATH } from './components/pages/Stats';
import Settings, { SETTINGS_PATH } from './components/pages/Settings';
import Login, { LOGIN_PATH } from './components/pages/Login';


interface PageOptionsT {
    pageType?: PageT,
    authRequired?: boolean,
}

const defaultPageOptions: PageOptionsT = {
    pageType: 'page',
    authRequired: false,
};


const route = (path: string, component: ReactElement, opt: PageOptionsT = {}) => {
    const options = { ...defaultPageOptions, ...opt };

    const page: () => ReactElement = options.pageType === 'page'
        ? () => withPage(component)
        : () => withFlexPage(component);

    const pageWithAuth: ComponentType | ReactElement = options.authRequired
        ? withAuthenticator(page)
        : page;

    return <Route path={ path } Component={ pageWithAuth as ComponentType } />;
};


//----------------------------------------------------------------------------------------------------------------------


const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                { route(LOGIN_PATH,     <Login />) }
                { route(HOME_PATH,      <Home />,       { pageType: 'flex-page' }) }
                { route(ABOUT_PATH,     <About />,      { pageType: 'flex-page' }) }
                { route(SUPPORT_PATH,   <Support />,    { pageType: 'flex-page' }) }
                { route(STATS_PATH,     <Stats />,      { pageType: 'page', authRequired: true }) }
                { route(SETTINGS_PATH,  <Settings />,   { pageType: 'page' }) }
            </Routes>
        </BrowserRouter>
    );
};

export default Router;

