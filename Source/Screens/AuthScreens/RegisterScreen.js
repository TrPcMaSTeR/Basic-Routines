import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { firebase } from "../../firebase/config";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { BRContext } from "./../../Context/BRContext";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";

export default function RegisterScreen() {
	const navigation = useNavigation();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const { user, setUser } = useContext(BRContext);

	const onRegisterPress = () => {
		if (password !== confirmPassword) {
			alert("Passwords don't match.");
			return;
		}

		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((response) => {
				const uid = response.user.uid;
				const data = {
					id: uid,
					email,
				};
				setUser(uid);
				firebase
					.firestore()
					.collection("users")
					.doc(uid)
					.set({ userTasks: [] });

				AsyncStorage.setItem("user", response.user.uid);
			})
			.catch((error) => {
				alert(error);
			});
	};

	return (
		<View style={styles.container}>
			<KeyboardAwareScrollView
				style={{ flex: 1, width: "100%" }}
				keyboardShouldPersistTaps="always"
			>
				<Image
					style={styles.logo}
					source={require("../../../assets/icon.png")}
				/>
				<TextInput
					style={styles.input}
					placeholder="E-mail"
					placeholderTextColor="#aaaaaa"
					onChangeText={(text) => setEmail(text)}
					value={email}
					underlineColorAndroid="transparent"
					autoCapitalize="none"
				/>
				<TextInput
					style={styles.input}
					placeholderTextColor="#aaaaaa"
					secureTextEntry
					placeholder="Password"
					onChangeText={(text) => setPassword(text)}
					value={password}
					underlineColorAndroid="transparent"
					autoCapitalize="none"
				/>
				<TextInput
					style={styles.input}
					placeholderTextColor="#aaaaaa"
					secureTextEntry
					placeholder="Confirm Password"
					onChangeText={(text) => setConfirmPassword(text)}
					value={confirmPassword}
					underlineColorAndroid="transparent"
					autoCapitalize="none"
				/>
				<TouchableOpacity
					style={styles.button}
					onPress={() => onRegisterPress()}
				>
					<Text style={styles.buttonTitle}>Create account</Text>
				</TouchableOpacity>
				<View style={styles.footerView}>
					<Text style={styles.footerText}>
						Already got an account?{" "}
						<Text
							onPress={() => {
								navigation.navigate("Login");
							}}
							style={styles.footerLink}
						>
							Log in
						</Text>
					</Text>
				</View>
			</KeyboardAwareScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
	},
	title: {},
	logo: {
		flex: 1,
		height: 60,
		width: 60,
		alignSelf: "center",
		margin: 30,
		borderRadius: 20,
	},
	input: {
		height: 48,
		borderRadius: 5,
		overflow: "hidden",
		backgroundColor: "white",
		marginTop: 10,
		marginBottom: 10,
		marginLeft: 30,
		marginRight: 30,
		paddingLeft: 16,
	},
	button: {
		backgroundColor: "#788eec",
		marginLeft: 30,
		marginRight: 30,
		marginTop: 20,
		height: 48,
		borderRadius: 5,
		alignItems: "center",
		justifyContent: "center",
	},
	buttonTitle: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
	footerView: {
		flex: 1,
		alignItems: "center",
		marginTop: 20,
	},
	footerText: {
		fontSize: 16,
		color: "#2e2e2d",
	},
	footerLink: {
		color: "#788eec",
		fontWeight: "bold",
		fontSize: 16,
	},
});
