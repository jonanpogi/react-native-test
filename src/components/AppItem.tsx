import { StyleSheet, Text, View } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Transaction = "cash_in" | "cash_out" | "pay_retailer" | "recieved_payment";

type Props = {
  transaction: Transaction;
  amount: number;
  date: string;
};

const AppItem = ({ transaction, amount, date }: Props) => {
  const details = (transaction: Transaction) => {
    let icon = null;
    let transactionMessage = "";
    let color = "";
    let amountSymbol = "";

    switch (transaction) {
      case "cash_in": {
        icon = <MaterialIcons name="add" size={18} color="#FFFFFF" />;
        transactionMessage = "Cash In";
        color = "#33CC7F";
        amountSymbol = "+";
        break;
      }
      case "cash_out": {
        icon = <FontAwesome name="bank" size={18} color="#FFFFFF" />;
        transactionMessage = "Cash Out";
        color = "#FF6666";
        amountSymbol = "-";
        break;
      }
      case "pay_retailer": {
        icon = (
          <FontAwesome6 name="money-bill-wave" size={18} color="#FFFFFF" />
        );
        transactionMessage = "Pay Retailer";
        color = "#FF6666";
        amountSymbol = "-";
        break;
      }
      case "recieved_payment": {
        icon = (
          <MaterialCommunityIcons name="hand-coin" size={18} color="#FFFFFF" />
        );
        transactionMessage = "Recieved Payment";
        color = "#33CC7F";
        amountSymbol = "+";
        break;
      }
      default: {
        break;
      }
    }

    return {
      icon,
      transactionMessage,
      color,
      amountSymbol,
    };
  };

  return (
    <View style={styles().container}>
      <View style={styles().iconContainer}>{details(transaction).icon}</View>
      <View style={styles().innerContainer}>
        <Text style={styles().transaction}>
          {details(transaction).transactionMessage}
        </Text>
        <Text style={styles(details(transaction).color).amount}>
          {details(transaction).amountSymbol + " " + Number(amount).toFixed(2)}
        </Text>
      </View>
      <Text style={styles().date}>{date}</Text>
    </View>
  );
};

const styles = (color?: string) =>
  StyleSheet.create({
    container: {
      height: 70,
      backgroundColor: "#FFFFFF",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      padding: 16,
    },
    iconContainer: {
      backgroundColor: "#66A3FF",
      padding: 16,
      borderRadius: 50,
      width: 50,
      height: 50,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 16,
    },
    innerContainer: {
      flex: 1,
    },
    transaction: {
      fontSize: 14,
      fontWeight: "700",
      color: "#333333",
    },
    amount: {
      fontSize: 16,
      fontWeight: "700",
      color,
    },
    date: {
      fontSize: 14,
      fontWeight: "400",
      color: "#666666",
    },
  });

export default AppItem;
