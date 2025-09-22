// Centralized theme for the app: colors, input styles, etc.
const theme = {
  // Main backgrounds
  lightBackground: '#d6d3c4ff', // Cremita
  navGreige: '#e6e1d6',       // Greige nav/header
  darkBackground: '#2b2d31',  // Gris oscuro (no tan negro)
  cardBackground: '#a49e8e',  // Greige oscuro para cards

  // Text
    textPrimary: '#000000ff',
    textSecondary: '#1a1818ff',

    // Accent colors
    green: '#4CAF50',
    yellow: '#f9d518',
    red: '#b82525',
    blue: '#2b77ff',

    // Other
    white: '#fcfbf7',
    black: '#1a1a1a',

    // Input style (for MUI sx prop)
    inputStyle: {
        sx: {
            '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                backgroundColor: '#a49e8e', // Use cardBackground
                color: '#000000ff', // Use textPrimary
                '& fieldset': {
                    borderColor: '#1a1818ff', // Use textSecondary
                    borderWidth: '2px',
                },
                '&:hover fieldset': {
                    borderColor: '#000000ff', // Use textPrimary
                },
                '&.Mui-focused fieldset': {
                    borderColor: '#2b77ff', // Use blue
                },
            },
            '& .MuiInputBase-input': {
                padding: '8px 12px',
            },
            '& .MuiInputLabel-root': {
                color: '#1a1818ff', // Use textSecondary
                backgroundColor: '#a49e8e', // Match input bg to avoid label "tachado"
                padding: '0 4px',
                zIndex: 1,
            },
            '& .MuiInputLabel-root.Mui-focused': {
                color: '#000000ff', // Use textPrimary
                backgroundColor: '#a49e8e',
            },
            '& .MuiInputLabel-root.Mui-error': {
                color: '#b82525', // Use red
                backgroundColor: '#a49e8e',
            },
            '& .MuiFormHelperText-root': {
                color: '#1a1818ff', // Use textSecondary
            },
        }
    }
    };

export default theme;
