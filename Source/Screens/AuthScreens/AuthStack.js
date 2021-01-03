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

const config = {
	animation: "spring",
	config: {
		stiffness: 1000,
		damping: 500,
		mass: 3,
		overshootClamping: true,
		restDisplacementThreshold: 0.01,
		restSpeedThreshold: 0.01,
	},
};
