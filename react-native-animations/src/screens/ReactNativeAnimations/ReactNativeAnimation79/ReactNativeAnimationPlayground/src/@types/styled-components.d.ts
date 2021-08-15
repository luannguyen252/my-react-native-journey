import { themes } from '../styles';

type ThemeInterface = typeof themes.dark;

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends ThemeInterface {}
}
