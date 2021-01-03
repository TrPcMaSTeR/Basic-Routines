import React from "react";
import { View, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
export default function Pomodoro() {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<FontAwesome5 name="clock" size={100} color="black" />
			<Text>TO DO Pomodoro</Text>
		</View>
	);
}
