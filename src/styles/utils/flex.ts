import { ViewStyle } from "react-native";

export default {
    flex1: {
        flex: 1,
    },

    flexRow: {
        flexDirection: 'row',
    },

    flexColumn: {
        flexDirection: 'column',
    },
} satisfies Record<string, ViewStyle>