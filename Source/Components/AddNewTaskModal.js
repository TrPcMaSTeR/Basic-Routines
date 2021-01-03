import React from "react";
import { StyleSheet, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Button, Modal, Portal } from "react-native-paper";

export default function AddNewTaskModal({
	visible,
	hideModal,
	name,
	start,
	end,
	setName,
	setStart,
	setEnd,
	addTask,
}) {
	return (
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
