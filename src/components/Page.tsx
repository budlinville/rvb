import { ReactElement } from "react";
import Header from "./Header";

interface PageProps {
    children: ReactElement;
};

const Page = ({ children }: PageProps) => {
    return (
        <div>
            <Header>
                { children }
            </Header>
        </div>
    );
}

export const withPage = (component: ReactElement) => (<Page>{ component }</Page>);
