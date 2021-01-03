import { AntDesign } from "@expo/vector-icons";
import firebase from "firebase";
import React, { useContext, useEffect, useState } from "react";
import { LogBox, Text, View, StyleSheet } from "react-native";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { Button, Modal, Portal } from "react-native-paper";
import { BRContext } from "../../../Context/BRContext";
LogBox.ignoreLogs([/Setting a timer/]);

export default function Home() {
	const [userTasks, setUserTasks] = useState([]);
	const { user } = useContext(BRContext);
	useEffect(() => {
		firebase
			.firestore()
			.collection("users")
			.doc(user)
			.get()
			.then((snap) => {
				if (snap.data().userTasks) {
					setUserTasks(snap.data().userTasks);
				}
			});
	}, []);
	const [visible, setVisible] = React.useState(false);
	const [name, setName] = useState("");
	const [start, setStart] = useState("");
	const [end, setEnd] = useState("");

	const showModal = () => setVisible(true);
	const hideModal = () => setVisible(false);

	const addTask = () => {
		if (name && start && end && userTasks) {
			firebase
				.firestore()
				.collection("users")
				.doc(user)
				.set({
					userTasks: [
						...userTasks,
						{ name: name, start: start, end: end },
					],
				});

			setUserTasks((prev) => [
				...prev,
				{ name: name, start: start, end: end },
			]);
		}
		setName("");
		setStart("");
		setEnd("");
		hideModal();
	};

	return (
		<View style={{ flex: 1 }}>
			<FlatList
				data={userTasks}
				renderItem={(item) => {
					return (
						<Button
							onPress={() => {}}
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
				}}
				keyExtractor={(item) => item.name}
			/>
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
			<Portal>
				<Modal
					visible={visible}
					onDismiss={hideModal}
					contentContainerStyle={styles.containerStyle}
				>
					<Text>Görev Ekle</Text>
					<TextInput
						style={styles.inputs}
						placeholder="Rutin Adı"
						value={name}
						onChangeText={(text) => setName(text)}
					></TextInput>
					<TextInput
						style={styles.inputs}
						placeholder="Başlangıç ör:17.00"
						value={start}
						onChangeText={(text) => setStart(text)}
					></TextInput>
					<TextInput
						style={styles.inputs}
						placeholder="Bitiş ör: 18.00"
						value={end}
						onChangeText={(text) => setEnd(text)}
					></TextInput>
					<Button
						style={{ marginTop: 10, width: "100%" }}
						onPress={addTask}
					>
						Ekle
					</Button>
				</Modal>
			</Portal>
		</View>
	);
}

const styles = StyleSheet.create({
	containerStyle: {
		backgroundColor: "white",
		padding: 20,
		alignItems: "center",
		justifyContent: "center",
		width: "90%",
		alignSelf: "center",
		borderRadius: 10,
	},
	inputs: {
		padding: 10,
		marginTop: 10,
		backgroundColor: "#eff8ff",
		borderRadius: 10,
		width: "90%",
	},
});
