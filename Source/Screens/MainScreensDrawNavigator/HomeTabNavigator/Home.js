import { AntDesign } from "@expo/vector-icons";
import firebase from "firebase";
import React, { useContext, useEffect, useState } from "react";
import { LogBox, Text, View, StyleSheet } from "react-native";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { Button, Modal, Portal } from "react-native-paper";
import Task from "../../../Components/Task";
import { BRContext } from "../../../Context/BRContext";
import AddNewTaskButton from "./../../../Components/AddNewTaskButton";
import AddNewTaskModal from "./../../../Components/AddNewTaskModal";
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
						<Task
							item={item}
							setUserTasks={setUserTasks}
							userTasks={userTasks}
						/>
					);
				}}
				keyExtractor={(item) => item.name + item.start + item.end}
			/>
			<AddNewTaskButton showModal={showModal} />
			<AddNewTaskModal
				addTask={addTask}
				start={start}
				end={end}
				name={name}
				setEnd={setEnd}
				setStart={setStart}
				setName={setName}
				visible={visible}
				hideModal={hideModal}
			/>
		</View>
	);
}
