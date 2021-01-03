import { AntDesign } from "@expo/vector-icons";
import firebase from "firebase";
import React, { useContext } from "react";
import { LogBox, Text, View, StyleSheet } from "react-native";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { Button, Modal, Portal } from "react-native-paper";
import { BRContext } from "../../../Context/BRContext";

LogBox.ignoreLogs([/Setting a timer/]);
const userTasks = [
	{ name: "Kahvaltı", start: "08.00", end: "09.00" },
	{ name: "Ders", start: "10.00", end: "11.00" },
	{ name: "Oyun", start: "11.00", end: "13.00" },
];

export default function Home() {
	const { user } = useContext(BRContext);
	const [visible, setVisible] = React.useState(false);

	const showModal = () => setVisible(true);
	const hideModal = () => setVisible(false);

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
								justifyContent: "center",
								borderRadius: 100,
							}}
							contentStyle={{ height: 70, borderRadius: 100 }}
							key={item.item.name + item.index}
						>
							<Text style={{ fontSize: 20, color: "#ef4f4f" }}>
								{item.item.name + ": "}
							</Text>
							<Text style={{ fontSize: 20, color: "#e7d9ea" }}>
								{item.item.start + "-" + item.item.end}
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
					firebase
						.firestore()
						.collection("users")
						.doc(user)
						.set({ array: userTasks });
					userTasks.push({
						name: "Çay" + (Math.random() * 24).toString(),
						start: (Math.random() * 24).toString(),
						end: (Math.random() * 24).toString(),
					});

					firebase
						.firestore()
						.collection("users")
						.doc(user)
						.get()
						.then((snap) => {
							console.log(snap.data());
						});
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
					></TextInput>
					<TextInput
						style={styles.inputs}
						placeholder="Başlangıç ör:17.00"
					></TextInput>
					<TextInput
						style={styles.inputs}
						placeholder="Bitiş ör: 18.00"
					></TextInput>
					<Button
						style={{ marginTop: 10, width: "100%" }}
						onPress={showModal}
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
