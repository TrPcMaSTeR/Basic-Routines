import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeTabs from "./HomeTabNavigator";
import Settings from "./Settings";

const Drawer = createDrawerNavigator();

export default function index() {
	return (
		<Drawer.Navigator initialRouteName="Home">
			<Drawer.Screen
				name="HomeTabs"
				options={{ title: "Routines" }}
				component={HomeTabs}
			/>
			<Drawer.Screen name="Settings" component={Settings} />
		</Drawer.Navigator>
	);
}
