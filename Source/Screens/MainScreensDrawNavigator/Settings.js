import AsyncStorage from "@react-native-community/async-storage";
import React, { useContext } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { BRContext } from "./../../Context/BRContext";

export default function Settings() {
	const { user, setUser } = useContext(BRContext);
	return (
		<View
			style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
		>
			<Button
				onPress={() => {
					AsyncStorage.removeItem("user");
					setUser(null);
				}}
				theme={{
					colors: {
						primary: "black",
					},
				}}
				mode="contained"
				style={{
					justifyContent: "center",
					padding: 10,
				}}
			>
				<Text style={{ color: "white", fontSize: 30 }}>Çıkış yap</Text>
			</Button>
		</View>
	);
}
