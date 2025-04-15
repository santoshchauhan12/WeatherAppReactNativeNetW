import { TextStyle, ViewStyle } from "react-native";
// import { CONST } from "src/CONST";
import { ThemeColors } from "./theme/types";
// import type {ValueOf} from 'type-fest';
import spacing from "./utils/spacing";
import flex from "./utils/flex";
import { defaultTheme } from "./theme";
import borders from "./utils/borders";

// type ColorScheme = ValueOf<typeof CONST.COLOR_SCHEME>;
// type StatusBarStyle = ValueOf<typeof CONST.STATUS_BAR_STYLE>;

type Styles = Record<
    string,
    | ViewStyle
    | TextStyle>;
const styles = (theme: ThemeColors) =>
({

    ...spacing,
    ...flex,

    searchInput: {
        ...spacing.mt10,
        ...spacing.ph10,
        ...spacing.pv5,
        ...borders.br3,
        backgroundColor: theme.searchInputBg,
        elevation: 2,
    },



    topBar: {
        ...flex.flexRow,
        ...spacing.pb10,
        ...spacing.pt10,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: theme.appBG
    },

    homePageTitle: {
        fontSize: 26,
        fontWeight: "600",
        color: theme.text
    },

    topBarRightControls: {
        ...flex.flexRow,
        alignItems: 'center',
        gap: 12,
    },

    searchIcon: {
        color: theme.text,
    },

    inputBox: {
        height: 40,
        fontSize: 16,
    },

    weatherReportContainer: {
        ...flex.flex1,
        justifyContent: 'center',
        alignItems: 'center'
    },


    //Weather Report card
    card: {
        ...spacing.m5,
        ...spacing.p5,
        ...borders.br4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 10,
        alignItems: 'center',
      },
      cityText: {
        ...spacing.mb5,
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.text
      },
      weatherImage: {
        ...spacing.mb2,
      },

      weatherMainText: {
        ...spacing.mb1,
        fontSize: 22,
        fontWeight: "600",
        color: theme.text
      },

      tempText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: theme.text
      },


      //Placeholders and errors
      placeHolderCard: {
        ...spacing.m5,
        ...spacing.p5,
        ...borders.br2,
        alignItems: 'center',
    },

    placeHolderTitle: {
        alignSelf: "center",
        fontSize: 22,
        fontWeight: "600",
        color: theme.text
    },

    placeHolderDescription: {
        alignSelf: "center",
        fontSize: 22,
        fontWeight: "600",
        color: theme.text
    }


} satisfies Styles);


type ThemeStyles = ReturnType<typeof styles>;

const defaultStyles = styles(defaultTheme);

export default styles;
export { defaultStyles };
export type { Styles, ThemeStyles };

