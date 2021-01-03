import React, { useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";

export const BRContext = React.createContext({
	user: null,
	setUser: null,
});

export function BRProvider({ children }) {
	const [user, setUser] = useState(null);
	return (
		<BRContext.Provider value={{ user, setUser }}>
			{children}
		</BRContext.Provider>
	);
}
