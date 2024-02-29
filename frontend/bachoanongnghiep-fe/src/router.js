import { ROUTER } from "./utils/router";
import Header from '../src/components/layout/header'
import { Routes,Route } from 'react-router-dom';

import Footer from '../src/components/layout/footer'
import Chat from '../src/components/layout/chat'
import Sliders from '../src/components/layout/slider';
import Sidebar from '../src/components/layout/sidebar';
const renderUserRouter = () => {
    const userrouter = [
        {
            path: ROUTER.USER.Home,
            component:  <Header />
        }
    ];

    return (
        <Routes>
            {userrouter.map((item, key) => (
                <Route
                    key={key}
                    path={item.path}
                    element={item.component}
                />
            ))}
        </Routes>
    );
};

const RouterCustom = () => {
    return renderUserRouter();
};

export default RouterCustom;
