import AsyncStorage from "@react-native-community/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { BRContext } from "./Context/BRContext";
import AuthStack from "./Screens/AuthScreens/AuthStack";
import Home from "./Screens/Home";

const RoutesStack = createStackNavigator();

export default function Routes() {
	const { user, setUser } = useContext(BRContext);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		AsyncStorage.getItem("user")
			.then((userString) => {
				if (userString) {
					setUser(userString);
				}
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	if (loading) {
		return (
			<View
				style={{
					flex: 1,
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<ActivityIndicator size="large" />
			</View>
		);
	}
	return (
		<RoutesStack.Navigator screenOptions={{ header: () => {} }}>
			{user ? (
				<RoutesStack.Screen name="Home" component={Home} />
			) : (
				<RoutesStack.Screen name="Auth" component={AuthStack} />
			)}
		</RoutesStack.Navigator>
	);
}
