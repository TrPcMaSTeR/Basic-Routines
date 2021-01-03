import React from "react";
import { View, StatusBar as bar } from "react-native";
import Routes from "./Source/Routes";
import { BRProvider } from "./Source/Context/BRContext";
import {
	NavigationContainer,
	DarkTheme as NavigationDarkTheme,
	DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import {
	DarkTheme as PaperDarkTheme,
	DefaultTheme as PaperDefaultTheme,
	Provider as PaperProvider,
} from "react-native-paper";
import { StatusBar } from "expo-status-bar";

import "./Source/utils/NotificationRegister";

const CombinedDarkTheme = {
	...PaperDarkTheme,
	...NavigationDarkTheme,
	colors: {
		...PaperDarkTheme.colors,
		...NavigationDarkTheme.colors,
	},
};

const CombinedDefaultTheme = {
	...PaperDefaultTheme,
	...NavigationDefaultTheme,
	colors: {
		...PaperDefaultTheme.colors,
		...NavigationDefaultTheme.colors,
	},
};

export default function App() {
	return (
		<BRProvider>
			<PaperProvider theme={CombinedDefaultTheme}>
				<NavigationContainer theme={CombinedDefaultTheme}>
					<StatusBar style="auto" />
					<View
						style={{
							flex: 1,
							marginTop: bar.currentHeight,
						}}
					>
						<Routes />
					</View>
				</NavigationContainer>
			</PaperProvider>
		</BRProvider>
	);
}
