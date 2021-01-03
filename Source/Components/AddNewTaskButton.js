import React from "react";
import { View, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Button } from "react-native-paper";

export default function AddNewTaskButton({ showModal }) {
	return (
		<Button
			style={{
				position: "absolute",
				bottom: 10,
				alignSelf: "center",
				borderRadius: 50,
				zIndex: 10,
			}}
			color="white"
			onPress={() => {
				showModal();
			}}
		>
			<AntDesign name="pluscircle" size={70} color="black" />
		</Button>
	);
}
