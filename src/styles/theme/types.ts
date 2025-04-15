import { CONST } from 'src/CONST';
import type {ValueOf} from 'type-fest';


type Color = string;
type ThemePreference = ValueOf<typeof CONST.THEME>;
type ThemePreferenceWithoutSystem = Exclude<ThemePreference, typeof CONST.THEME.SYSTEM>;


type ThemeColors = {
    appBG: Color;
    splashBG: Color;
    text: Color;
    searchInputBg:Color;
    topBar: Color;

}

export {type ThemePreference, type ThemePreferenceWithoutSystem, type ThemeColors, type Color};
