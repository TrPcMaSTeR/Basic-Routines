import { createStackNavigator, TransitionSpecs } from "@react-navigation/stack";
import React from "react";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";

const Stack = createStackNavigator();

export default function AuthStack() {
	return (
		<Stack.Navigator
			screenOptions={{ header: () => {} }}
			initialRouteName="Login"
		>
			<Stack.Screen
				options={{
					transitionSpec: {
						open: TransitionSpecs.TransitionIOSSpec,
						close: TransitionSpecs.TransitionIOSSpec,
					},
				}}
				name="Login"
				component={LoginScreen}
			/>
			<Stack.Screen
				options={{
					transitionSpec: {
						open: TransitionSpecs.TransitionIOSSpec,
						close: TransitionSpecs.TransitionIOSSpec,
					},
				}}
				name="Register"
				component={RegisterScreen}
			/>
		</Stack.Navigator>
	);
}
