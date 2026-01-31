import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

export function Layout() {
    return (
        <div className="app-container">
            <Sidebar />
            <main className="main-content">
                <TopBar />
                <div className="content-area">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
