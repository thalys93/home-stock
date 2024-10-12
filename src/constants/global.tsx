import { StyleSheet } from "react-native";
import { ThemeProp } from "react-native-paper/lib/typescript/types";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { COLORS } from "./colors";
import { FONTS } from "./fonts";

export const appName = "Home Stock"
export const appVersion = "1.0.0"
export const branch = "alpha"

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: RFPercentage(5),
        backgroundColor: COLORS.bgColor
    },

    defaultToast1Text: {
        textAlign: 'center',
        fontFamily: FONTS.Worksans,
        fontSize: RFValue(12),
        color: COLORS.whiteTxt
    },
    
    defaultToast2Text: {
        textAlign: 'center',
        fontFamily: FONTS.Worksans,
        fontSize: RFValue(12),
        color: COLORS.whiteTxt
    }
})

export const ThemeLight: ThemeProp = {
    colors: {
        "primary": "#00639C",
        "onPrimary": "#FFFFFF",
        "primaryContainer": "#CEE5FF",
        "onPrimaryContainer": "#001D33",
        "secondary": "#4755B6",
        "onSecondary": "#FFFFFF",
        "secondaryContainer": "#DFE0FF",
        "onSecondaryContainer": "#000D5F",
        "tertiary": "#006874",
        "onTertiary": "#FFFFFF",
        "tertiaryContainer": "#97F0FF",
        "onTertiaryContainer": "#001F24",
        "error": "#BA1A1A",
        "onError": "#FFFFFF",
        "errorContainer": "#FFDAD6",
        "onErrorContainer": "#410002",
        "background": "#FCFCFF",
        "onBackground": "#1A1C1E",
        "surface": "#FCFCFF",
        "onSurface": "#1A1C1E",
        "surfaceVariant": "#DEE3EB",
        "onSurfaceVariant": "#42474E",
        "outline": "#72777F",
        "outlineVariant": "#C2C7CF",
        "shadow": "#000000",
        "scrim": "#000000",
        "inverseSurface": "#2F3033",
        "inverseOnSurface": "#F1F0F4",
        "inversePrimary": "#98CBFF",
        "elevation": {
            "level0": "transparent",
            "level1": "#EFF4FA",
            "level2": "#E8F0F7",
            "level3": "#E0EBF4",
            "level4": "#DEEAF3",
            "level5": "#D9E7F1"
        },
        "surfaceDisabled": "rgba(26, 28, 30, 0.12)",
        "onSurfaceDisabled": "rgba(26, 28, 30, 0.38)",
        "backdrop": "rgba(44, 49, 55, 0.4)"
    }
}

export const ThemeDark: ThemeProp = {
    colors: {
        "primary": "#98CBFF",
        "onPrimary": "#003354",
        "primaryContainer": "#004A77",
        "onPrimaryContainer": "#CEE5FF",
        "secondary": "#BBC3FF",
        "onSecondary": "#112286",
        "secondaryContainer": "#2D3C9C",
        "onSecondaryContainer": "#DFE0FF",
        "tertiary": "#4FD8EB",
        "onTertiary": "#00363D",
        "tertiaryContainer": "#004F58",
        "onTertiaryContainer": "#97F0FF",
        "error": "#FFB4AB",
        "onError": "#690005",
        "errorContainer": "#93000A",
        "onErrorContainer": "#FFB4AB",
        "background": "#1A1C1E",
        "onBackground": "#E2E2E5",
        "surface": "#1A1C1E",
        "onSurface": "#E2E2E5",
        "surfaceVariant": "#42474E",
        "onSurfaceVariant": "#C2C7CF",
        "outline": "#8C9199",
        "outlineVariant": "#42474E",
        "shadow": "#000000",
        "scrim": "#000000",
        "inverseSurface": "#E2E2E5",
        "inverseOnSurface": "#2F3033",
        "inversePrimary": "#00639C",
        "elevation": {
            "level0": "transparent",
            "level1": "#202529",
            "level2": "#242A30",
            "level3": "#282F37",
            "level4": "#293139",
            "level5": "#2C353E"
        },
        "surfaceDisabled": "rgba(226, 226, 229, 0.12)",
        "onSurfaceDisabled": "rgba(226, 226, 229, 0.38)",
        "backdrop": "rgba(44, 49, 55, 0.4)"
    }
}
