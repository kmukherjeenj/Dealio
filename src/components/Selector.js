import React from "react";
import { Text, makeStyles, useTheme } from "@rneui/themed";
import { TouchableOpacity, View } from "react-native";

const Selector = ({ data, selectedItems, onAdd }) => {
	const styles = useStyles();
	const { theme } = useTheme();

	return (
		<View style={styles.container}>
			{data?.map((item, index) => {
				const selected = selectedItems.includes(item);
				return (
					<TouchableOpacity
						key={index}
						onPress={() => onAdd(item)}
						style={selected ? styles.selectedItem : styles.item}
					>
						<Text
							style={selected ? styles.selectedText : styles.text}
						>
							{item}
						</Text>
					</TouchableOpacity>
				);
			})}
		</View>
	);
};

const useStyles = makeStyles((theme) => ({
	container: {
		flex: 1,
		display: "flex",
		flexWrap: "wrap",
		flexDirection: "row",
	},
	item: {
		paddingVertical: theme.spacing.md,
		paddingHorizontal: theme.spacing.lg,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		borderRadius: 50,
		borderColor: theme.colors.grey3,
		minWidth: 50,
		marginRight: theme.spacing.sm,
		marginVertical: theme.spacing.xs,
	},
	selectedItem: {
		paddingVertical: theme.spacing.md,
		paddingHorizontal: theme.spacing.lg,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		borderRadius: 50,
		borderColor: theme.colors.primary,
		minWidth: 50,
		marginRight: theme.spacing.sm,
		backgroundColor: theme.colors.primary,
		marginVertical: theme.spacing.xs,
	},
	selectedText: {
		color: theme.colors.white,
	},
	text: {},
}));

export default Selector;
