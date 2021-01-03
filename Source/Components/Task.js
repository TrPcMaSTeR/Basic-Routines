import React, { useContext } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { BRContext } from "./../Context/BRContext";
import firebase from "firebase";

export default function Task({ item, setUserTasks, userTasks }) {
	const removeTask = (name) => {
		setUserTasks(userTasks.filter((dt) => dt.name != name));
		firebase
			.firestore()
			.collection("users")
			.doc(user)
			.set({
				userTasks: userTasks.filter((dt) => dt.name != name),
			});
	};

	const { user } = useContext(BRContext);
	return (
		<Button
			onPress={() => {
				removeTask(item.item.name);
			}}
			style={{
				backgroundColor: "#19456b",
				margin: 10,
				height: 70,
				borderRadius: 30,
			}}
			contentStyle={{
				height: 70,
				borderRadius: 30,
				alignContent: "space-between",
			}}
			labelStyle={{}}
			key={item.item.name + item.index}
		>
			<Text
				style={{
					fontSize: 22,
					color: "#ef4f4f",
				}}
			>
				{item.item.name + ":    "}
			</Text>
			<Text style={{ fontSize: 22, color: "#e7d9ea" }}>
				{item.item.start + " - " + item.item.end}
			</Text>
		</Button>
	);
}
