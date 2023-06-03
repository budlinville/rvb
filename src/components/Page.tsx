import { ReactElement } from "react";
import Header from "./Header";
import useWindowHeight from "../hooks/useWindowHeight";
import useHeaderHeight from "../hooks/useHeaderHeight";


export type PageT = 'page' | 'flex-page';


//----------------------------------------------------------------------------------------------------------------------
interface PageProps {
    children: ReactElement;
};

const Page = ({ children }: PageProps) => {
    return (
        <Header>
            { children }
        </Header>
    );
}

export const withPage = (component: ReactElement): ReactElement => (<Page>{ component }</Page>);


//----------------------------------------------------------------------------------------------------------------------
const FlexPage = ({ children }: PageProps) => {
    const pageHeight = useWindowHeight() - useHeaderHeight();
    return (
        <Header>
            <div style={{ display: 'flex', height: pageHeight }}>
                { children }
            </div>
        </Header>
    );
}

export const withFlexPage = (component: ReactElement): ReactElement => (<FlexPage>{ component }</FlexPage>);
