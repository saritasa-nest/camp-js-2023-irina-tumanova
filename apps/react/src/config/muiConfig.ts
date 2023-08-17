import { createTheme } from "@mui/material";
import { PaletteColorOptions, } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface CustomPalette {
        white: PaletteColorOptions;
    }
    interface Palette extends CustomPalette { }
    interface PaletteOptions extends CustomPalette { }
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        white: true;
    }
}

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: string) => augmentColor({ color: { main: mainColor } });

export const theme = createTheme({
    palette: {
        white: createColor('#FFFFFF'),
    },
});