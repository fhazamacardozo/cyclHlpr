import { Link } from 'react-router-dom';
import colors from '../styles/theme';

function Navbar() {
    return (
        <nav
        className="w-full flex items-center justify-between py-4 px-2 mb-4 rounded-b-lg shadow"
        style={{ backgroundColor: colors.darkBackground }}
        >
        <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold" style={{ color: colors.green }}>
                CyclHlpr
            </h1>
            <Link to="/"
                className="font-medium px-4 py-2 rounded transition-colors hover:underline"
                style={{ color: colors.blue, backgroundColor: 'transparent' }}
            >
                Daily Report
            </Link>
            <Link to="/weekly"
            className="font-medium px-4 py-2 rounded transition-colors hover:underline"
            style={{ color: colors.blue, backgroundColor: 'transparent' }}
            >
                Weekly Check-In
            </Link>
            <Link to="/calendar"
            className="font-medium px-4 py-2 rounded transition-colors hover:underline"
            style={{ color: colors.blue, backgroundColor: 'transparent' }}
            >
                Calendar
            </Link>
        </div>
        </nav>
    );
}

export default Navbar;