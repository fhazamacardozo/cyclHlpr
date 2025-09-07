import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export default function ThemeToggle({ darkMode, setDarkMode }) {
    return (
        <IconButton onClick={() => setDarkMode((prev) => !prev)} color="inherit">
        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
    );
}
