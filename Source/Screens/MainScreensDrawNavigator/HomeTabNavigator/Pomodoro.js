import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import React, { useState, useEffect, useRef } from "react";
import { Text, View, Button, Platform } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

export default function Pomodoro() {
	const [expoPushToken, setExpoPushToken] = useState("");
	const [notification, setNotification] = useState(false);
	const notificationListener = useRef();
	const responseListener = useRef();

	useEffect(() => {
		registerForPushNotificationsAsync()
			.then((token) => setExpoPushToken(token))
			.catch((err) => console.error(err));

		// This listener is fired whenever a notification is received while the app is foregrounded
		notificationListener.current = Notifications.addNotificationReceivedListener(
			(notification) => {
				setNotification(notification);
			}
		);

		// This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
		responseListener.current = Notifications.addNotificationResponseReceivedListener(
			(response) => {
				console.log(response);
			}
		);

		return () => {
			Notifications.removeNotificationSubscription(notificationListener);
			Notifications.removeNotificationSubscription(responseListener);
		};
	}, []);

	return (
		<View
			style={{
				flex: 1,
				alignItems: "center",
				justifyContent: "space-around",
			}}
		>
			<Text>Expo push token: {expoPushToken}</Text>
			<View style={{ alignItems: "center", justifyContent: "center" }}>
				<Text>
					Title: {notification && notification.request.content.title}{" "}
				</Text>
				<Text>
					Body: {notification && notification.request.content.body}
				</Text>
				<Text>
					Data:{" "}
					{notification &&
						JSON.stringify(notification.request.content.data)}
				</Text>
			</View>
			<Button
				title="Send Notification"
				onPress={async () => {
					await sendPushNotification(expoPushToken);
				}}
			/>
			<View
				style={{
					justifyContent: "center",
					alignItems: "center",
					marginTop: 50,
				}}
			>
				<FontAwesome5 name="clock" size={100} color="black" />
				<Text>TO DO Pomodoro</Text>
			</View>
		</View>
	);
}

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/notifications
async function sendPushNotification(expoPushToken) {
	const message = {
		to: expoPushToken,
		sound: "default",
		title: "Görev",
		body: "Göreviniz tamamlandı!",
		data: { ornekVeri: "Cihaza yollanan veri." },
	};

	await fetch("https://exp.host/--/api/v2/push/send", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Accept-encoding": "gzip, deflate",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(message),
	});
}

async function registerForPushNotificationsAsync() {
	let token;
	if (Constants.isDevice) {
		const { status: existingStatus } = await Permissions.getAsync(
			Permissions.NOTIFICATIONS
		);
		let finalStatus = existingStatus;
		if (existingStatus !== "granted") {
			const { status } = await Permissions.askAsync(
				Permissions.NOTIFICATIONS
			);
			finalStatus = status;
		}
		if (finalStatus !== "granted") {
			alert("Failed to get push token for push notification!");
			return;
		}
		token = (await Notifications.getExpoPushTokenAsync()).data;
		console.log(token);
	} else {
		alert("Must use physical device for Push Notifications");
	}

	if (Platform.OS === "android") {
		Notifications.setNotificationChannelAsync("default", {
			name: "default",
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: "#FF231F7C",
		});
	}

	return token;
}
