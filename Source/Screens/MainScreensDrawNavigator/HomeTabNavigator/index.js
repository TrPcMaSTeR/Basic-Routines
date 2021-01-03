import React from "react";
import { View, Text } from "react-native";
import Home from "./Home";
import Pomodoro from "./Pomodoro";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();

export default function HomeTabs() {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === "Home") {
						return (
							<FontAwesome5 name="home" size={25} color={color} />
						);
					} else if (route.name === "Pomodoro") {
						return (
							<AntDesign
								name="clockcircle"
								size={25}
								color={color}
							/>
						);
					}

					return <FontAwesome5 name="home" size={25} color={color} />;
					// You can return any component that you like here!
				},
			})}
			tabBarOptions={{
				activeTintColor: "#19456b",
				inactiveTintColor: "black",
			}}
		>
			<Tab.Screen
				options={{ title: "Rutinler" }}
				name="Home"
				component={Home}
			/>
			<Tab.Screen name="Pomodoro" component={Pomodoro} />
		</Tab.Navigator>
	);
}
