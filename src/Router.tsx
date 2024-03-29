import { ReactElement, ComponentType } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { withAuthenticator } from '@aws-amplify/ui-react';

import { PageT, withFlexPage, withPage } from './components/Page';

import Home, { HOME_PATH } from './components/pages/Home';
import About, { ABOUT_PATH } from './components/pages/About';
import Stats, { STATS_PATH } from './components/pages/Stats';
import Settings, { SETTINGS_PATH } from './components/pages/Settings';
import Login, { LOGIN_PATH } from './components/pages/Login';
import Profile, { PROFILE_PATH } from './components/pages/Profile';
import { STORE_ROUTE } from './components/Header/SideDrawer';

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
                { route(ABOUT_PATH,     <About />,      { pageType: 'page' }) }
                {/* { route(SUPPORT_PATH,   <Support />,    { pageType: 'flex-page' }) } */}
                { route(STATS_PATH,     <Stats />,      { pageType: 'page', authRequired: false }) }
                { route(SETTINGS_PATH,  <Settings />,   { pageType: 'page' }) }
                { route(PROFILE_PATH,   <Profile />,    { pageType: 'page' }) }
                <Route path={STORE_ROUTE} Component={() => {
                    window.location.href = 'https://my-store-f09d8a.creator-spring.com';
                    return null;
                }}/>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
