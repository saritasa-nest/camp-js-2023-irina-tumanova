import { createTheme } from '@mui/material';
import { PaletteColorOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
	interface CustomPalette {

		/** Custom color - white. */
		white: PaletteColorOptions;
	}
    type Palette = CustomPalette;
    type PaletteOptions = CustomPalette;
}

declare module '@mui/material/Button' {
	interface ButtonPropsColorOverrides {

		/** Custom color - white. */
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
