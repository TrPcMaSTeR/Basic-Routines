import React from "react";
import { StyleSheet, Text, View, StatusBar as bar } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import Routes from "./Source/Routes";
import { BRProvider } from "./Source/Context/BRContext";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

export default function App() {
	return (
		<BRProvider>
			<PaperProvider>
				<NavigationContainer>
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
