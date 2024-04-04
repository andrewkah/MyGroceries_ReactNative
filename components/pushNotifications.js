import { useState, useEffect, useRef } from "react";
import { Text, View, Button, Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { showAlert } from "./Alert";
import axios from "axios";
import BASEURL from "../config";
import BackgroundFetch from 'react-native-background-fetch';
import NetInfo from "@react-native-community/netinfo";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function PushNotifications() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const [itemArray, setItemArray] = useState([]);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
      // initBackgroundFetch();
    };
  }, []);

  // const initBackgroundFetch = async () => {
  //   const onEvent = async (taskId) => {
  //     console.log('[BackgroundFetch] task: ', taskId);
  //     await addEvent(taskId);
  //     BackgroundFetch.finish(taskId);
  //   };

  //   const onTimeout = async (taskId) => {
  //     console.warn('[BackgroundFetch] TIMEOUT task: ', taskId);
  //     BackgroundFetch.finish(taskId);
  //   };

  //   const status = await BackgroundFetch.configure({ minimumFetchInterval: 15 }, onEvent, onTimeout);
  //   console.log('[BackgroundFetch] configure status: ', status);
  // };

  // const addEvent = async (taskId) => {
  //   return new Promise((resolve, reject) => {
  //     setEvents(prevEvents => [
  //       ...prevEvents,
  //       {
  //         taskId: taskId,
  //         timestamp: (new Date()).toString()
  //       }
  //     ]);
  //     resolve();
  //   });
  // };

  async function configureBackgroundTasks() {
    // await BackgroundFetch.configure(
    //   {
    //     minimumFetchInterval: 15, // Five hours
    //     stopOnTerminate: false,
    //     startOnBoot: true,
    //     enableHeadless: true,
    //   },
    //   async () => {
    //     console.log("BAckground task complete")
    //     performBackgroundTask();
    //   },
    //   (error) => {
    //     console.log("Background fetch failed to start", error);
    //   }
    // ).catch((err) => {
    //   console.log("Error configuring background fetch!", err.message)
    // });

    
    
  }
  const performBackgroundTask = () => {
    NetInfo.fetch().then(async (state) => {
      if (state.isConnected) {
        {
          console.log("Connected")
          getQuantityItems()
          if (itemArray.length !== 0) {
            (await schedulePushNotification(itemArray)); 
          }
          console.log("Done")
        }
      } else {
        console.log("Network is not available");
      }
    });
  }

  const getQuantityItems = async () => {
    try {
      const response = await axios.get(`${BASEURL}/category/item/quantity`);
      let quantityItems = response.data;
      setItemArray(quantityItems);
      console.log(quantityItems);
    } catch (err) {
      let errorMessage = err.response?.data || "Error deleting Categories";
      showAlert("danger", errorMessage);
    }
  };

  
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text>
          Title: {notification && notification.request.content.title}{" "}
        </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>
          Data:{" "}
          {notification && JSON.stringify(notification.request.content.data)}
        </Text>
      </View>
      <Button
        title="Press to schedule a notification"
        onPress={() => {
          performBackgroundTask()
        }}
      />
    </View>
  );
}

async function schedulePushNotification({ item }) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `Low Quantity in ${item.name}! 📬`,
      body: `${item.name} is running low in quantity`,
      data: { quantity: `${item.quantity}`, price: `${item.price}` },
    },
    // trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
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

  return token;
}
