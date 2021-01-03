import AsyncStorage from "@react-native-community/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { firebase } from "../../firebase/config";
import { BRContext } from "./../../Context/BRContext";

export default function LoginScreen() {
	const navigation = useNavigation();
	const { setUser } = useContext(BRContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onLoginPress = () => {
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then((response) => {
				setUser(response.user.uid);
				AsyncStorage.setItem("user", response.user.uid);

				// const uid = response.user.uid;
				// const usersRef = firebase.firestore().collection("users");
				// usersRef
				// 	.doc(uid)
				// 	.get()
				// 	.then((firestoreDocument) => {
				// 		if (!firestoreDocument.exists) {
				// 			alert("User does not exist anymore.");
				// 			return;
				// 		}
				// 		const user = firestoreDocument.data();
				// 		// navigation.navigate("Home", {
				// 		// 	user: user,
				// 		// });
				// 	})
				// 	.catch((error) => {
				// 		alert(error);
				// 	});
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
					source={require("../../../assets/icon.jpg")}
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
				<TouchableOpacity
					style={styles.button}
					onPress={() => onLoginPress()}
				>
					<Text style={styles.buttonTitle}>Log in</Text>
				</TouchableOpacity>
				<View style={styles.footerView}>
					<Text style={styles.footerText}>
						Don't have an account?{" "}
						<Text
							onPress={() => {
								navigation.navigate("Register");
							}}
							style={styles.footerLink}
						>
							Sign up
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
