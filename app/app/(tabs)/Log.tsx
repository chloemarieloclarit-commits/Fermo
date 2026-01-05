import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Platform,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import Toast from "react-native-toast-message";
import axiosInstance from "@/axiosConfig";
import loadingOverlay from "../components/LoadingOverlay";
import logo from "../../assets/images/logo.png";

/* ================= TABLE HEADER ================= */
const renderTableHeading = () => {
  return (
    <View className="flex-row w-full py-2 bg-slate-400 rounded-t-lg">
      <Text className="w-24 text-center text-white text-xs">Date</Text>
      <Text className="flex-1 text-center text-white text-xs">Temp</Text>
      <Text className="flex-1 text-center text-white text-xs">pH 1</Text>
      <Text className="flex-1 text-center text-white text-xs">pH 2</Text>
      <Text className="flex-1 text-center text-white text-xs">pH 3</Text>
    </View>
  );
};

/* ================= TABLE ROW ================= */
const renderTableData = ({ item }) => {
  if (!item) return null;

  return (
    <View className="flex-row w-full py-2 border-b border-gray-200">
      <Text className="w-24 text-xs pl-2">
        {new Date(item.eventDate).toLocaleDateString()}
      </Text>
      <Text className="flex-1 text-xs text-center">{item.temperature}</Text>
      <Text className="flex-1 text-xs text-center">{item.pH1}</Text>
      <Text className="flex-1 text-xs text-center">{item.pH2}</Text>
      <Text className="flex-1 text-xs text-center">{item.pH3}</Text>
    </View>
  );
};

/* ================= MAIN SCREEN ================= */
const ProfileTab = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDateSelection, setShowStartDateSelection] = useState(false);
  const [showEndDateSelection, setShowEndDateSelection] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  /* ================= DATE HANDLERS ================= */
  const changeStartDate = (event) => {
    if (event?.nativeEvent?.timestamp) {
      setStartDate(new Date(event.nativeEvent.timestamp));
    }
    setShowStartDateSelection(false);
  };

  const changeEndDate = (event) => {
    if (event?.nativeEvent?.timestamp) {
      setEndDate(new Date(event.nativeEvent.timestamp));
    }
    setShowEndDateSelection(false);
  };

  /* ================= FETCH EVENTS ================= */
  const searchEvents = async () => {
    setIsLoading(true);
    setData([]);

    try {
      const payload = {
        startDate,
        endDate,
      };

      const response = await axiosInstance.post(
        "/event/sensor-records",
        payload,
        { withCredentials: true }
      );

      if (!response.data.success) {
        Toast.show({
          type: "error",
          text1: "❌ Error loading records",
          text2: response.data.message,
        });
        setData([]);
      } else {
        setData(response.data.data);
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "❌ Server Error",
        text2: error.message,
      });
    }

    setIsLoading(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-blue-100">
      {isLoading && loadingOverlay()}

      {/* ================= HEADER ================= */}
      <View className="flex-row items-center gap-5 px-5 py-4 bg-blue-300 border-b border-blue-400">
        <Image source={logo} style={{ width: 50, height: 50 }} />
        <Text className="text-3xl font-extrabold text-orange-500">
          Logs
        </Text>
      </View>

      {/* ================= FILTER CARD ================= */}
      <View className="px-7 py-4 mx-5 my-5 bg-blue-300 rounded-lg">
        <View className="flex-row gap-4 mb-4">
          {/* Start Date */}
          <View className="flex-1">
            <Text className="text-black text-base mb-1">Start Date</Text>
            <TouchableOpacity
              onPress={() => setShowStartDateSelection(true)}
              className="bg-white border border-slate-300 rounded-xl p-4 flex-row justify-between items-center"
            >
              <Text className="text-slate-600">
                {startDate.toLocaleDateString()}
              </Text>
              <MaterialIcons name="arrow-drop-down" size={25} />
            </TouchableOpacity>

            {showStartDateSelection && (
              <DateTimePicker
                value={startDate}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={changeStartDate}
              />
            )}
          </View>

          {/* End Date */}
          <View className="flex-1">
            <Text className="text-black text-base mb-1">End Date</Text>
            <TouchableOpacity
              onPress={() => setShowEndDateSelection(true)}
              className="bg-white border border-slate-300 rounded-xl p-4 flex-row justify-between items-center"
            >
              <Text className="text-slate-600">
                {endDate.toLocaleDateString()}
              </Text>
              <MaterialIcons name="arrow-drop-down" size={25} />
            </TouchableOpacity>

            {showEndDateSelection && (
              <DateTimePicker
                value={endDate}
                mode="date"
                minimumDate={startDate}
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={changeEndDate}
              />
            )}
          </View>
        </View>

        <TouchableOpacity
          onPress={searchEvents}
          className="bg-blue-600 py-3 rounded-lg"
        >
          <Text className="text-center text-white font-semibold">
            Search
          </Text>
        </TouchableOpacity>
      </View>

      {/* ================= TABLE ================= */}
      {data.length > 0 && (
        <View className="mx-2 bg-white rounded-lg overflow-hidden">
          <FlatList
            data={data}
            keyExtractor={(item) => item._id}
            ListHeaderComponent={renderTableHeading}
            renderItem={renderTableData}
            stickyHeaderIndices={[0]}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default ProfileTab;
