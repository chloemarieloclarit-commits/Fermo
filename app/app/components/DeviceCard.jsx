import { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, Octicons } from '@expo/vector-icons';

/* ---------- Metric Card ---------- */
const MetricCard = ({ title, value, unit, iconName, color }) => (
  <View className="w-1/2 p-2">
    <View className={`flex-row items-center p-3 rounded-xl border border-gray-100 ${color}`}>
      <MaterialCommunityIcons name={iconName} size={24} color="#374151" />
      <View className="ml-3">
        <Text className="text-lg font-bold text-gray-800">
          {value}{unit}
        </Text>
        <Text className="text-xs text-gray-500">{title}</Text>
      </View>
    </View>
  </View>
);

/* ---------- Device Card ---------- */
const DeviceCard = ({ device, pressEventHandler }) => {

  const lastUpdateText = device.lastUpdate
    ? new Date(device.lastUpdate).toLocaleString()
    : 'No data';

  useEffect(()=>{
    console.log(JSON.stringify(device));
  }, []);

  return (
    <TouchableOpacity
      className="bg-white mx-4 mt-4 p-4 rounded-xl shadow-md border border-gray-100 active:bg-gray-50"
      onPress={() => pressEventHandler(device)}
      activeOpacity={0.8}
    >

      {/* Header */}
      <View className="flex-row justify-between items-start pb-3 mb-3 border-b border-gray-100">
        <View className="flex-1">
          <Text className="text-xl font-extrabold text-gray-900">
            {device.deviceID}
          </Text>
          <Text className="text-xs text-gray-500 mt-1">
            Last update: {lastUpdateText}
          </Text>
        </View>

        <Octicons
          name="dot-fill"
          size={30}
          color={device.isOnline ? 'green' : 'red'}
        />
      </View>

      {/* Temperature */}
      <View className="flex-row flex-wrap -m-2">
        <MetricCard
          title="Temperature"
          value={device.temperature}
          unit="°C"
          iconName="temperature-celsius"
          color="bg-red-50"
        />
      </View>

      {/* Field 1 */}
      <View className="mt-3 mx-1 border border-gray-200 rounded-lg">
        <Text className="text-lg font-extrabold text-gray-900 mx-3 my-2">
          Field 1
        </Text>
        <View className="flex-row">
          <MetricCard
            title="pH Level"
            value={device.pH1}
            unit=""
            iconName="flask-outline"
            color="bg-green-50"
          />
        </View>
      </View>

      {/* Field 2 */}
      <View className="mt-3 mx-1 border border-gray-200 rounded-lg">
        <Text className="text-lg font-extrabold text-gray-900 mx-3 my-2">
          Field 2
        </Text>
        <View className="flex-row">
          <MetricCard
            title="pH Level"
            value={device.pH2}
            unit=""
            iconName="flask-outline"
            color="bg-green-50"
          />
        </View>
      </View>

      {/* Field 3 */}
      <View className="mt-3 mx-1 border border-gray-200 rounded-lg">
        <Text className="text-lg font-extrabold text-gray-900 mx-3 my-2">
          Field 3
        </Text>
        <View className="flex-row">
          <MetricCard
            title="pH Level"
            value={device.pH3}
            unit=""
            iconName="flask-outline"
            color="bg-green-50"
          />
        </View>
      </View>

    </TouchableOpacity>
  );
};

export default DeviceCard;
