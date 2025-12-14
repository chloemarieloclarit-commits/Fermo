import { View, Text, ScrollView, SafeAreaView } from "react-native";
import React, {useState, useEffect, use} from "react";
import axiosInstance from '../axiosConfig.js';


export default function FermentationScreen() {
 
  const [data, setData] = useState();
  
useEffect(()=>{
  const func=async()=>{
 try{
  const response = await axiosInstance.get("/device/get");
  if (!response.data.success){
    console.log(JSON.stringify(response.data.message));
    setData([]);
     }else{
      setData(response.data.data);
      console.log(JSON.stringify(response.data)); 
  }
 }catch(error){
   console.error("Data retrieval error:", error.message); 
 }
}

  func();
},[]);


  return (
    <SafeAreaView className="flex-1 bg-[#F5F5F5]">
      <ScrollView className="px-5 py-6">

        {/* Header */}
        <Text className="text-3xl font-bold text-gray-900">
          FERMO Dashboard
        </Text>
        <Text className="text-gray-500 mt-1">
          Smart Fermentation Monitoring System
        </Text>

        {/* Live Readings */}
        <View className="mt-6 bg-white rounded-2xl p-5 shadow">
          <Text className="text-xl font-semibold text-gray-800">
            Live Readings
           
            Container 1
            
          </Text>

          <View className="flex-row justify-between mt-4">
            <View className="bg-green-100 px-4 py-3 rounded-xl w-[48%]">
              <Text className="text-gray-600">pH Level</Text>
              <Text className="text-3xl font-bold text-green-700">3.82</Text>
              <Text className="text-green-700">Mid-Fermentation</Text>
            </View>

            <View className="bg-blue-100 px-4 py-3 rounded-xl w-[48%]">
              <Text className="text-gray-600">Temperature</Text>
              <Text className="text-3xl font-bold text-blue-700">31.7°C</Text>
              <Text className="text-blue-700">Optimal Range</Text>
            </View>
          </View>

          {/* Container Type */}
          <View className="mt-5 bg-orange-100 px-4 py-3 rounded-xl">
            <Text className="text-gray-600">Container Type</Text>
            <Text className="text-xl font-bold text-orange-700">Clay Jar</Text>
            <Text className="text-orange-700">Traditional Long Fermentation</Text>
          </View>
        </View>


{/* Fermentation Stage */}
        <View className="mt-6 bg-white rounded-2xl p-5 shadow">
          <Text className="text-xl font-semibold text-gray-800">
            Current Fermentation Stage
          </Text>

          <View className="mt-4 bg-yellow-100 px-4 py-4 rounded-xl">
            <Text className="text-yellow-700 font-bold text-lg">Stage 2</Text>
            <Text className="text-yellow-700">Mid Fermentation</Text>
            <Text className="text-gray-700 mt-1">
              Acetic acid formation is active. pH is gradually decreasing.
            </Text>
          </View>
        </View>

         <View className="mt-6 bg-white rounded-2xl p-5 shadow">
          <Text className="text-xl font-semibold text-gray-800">
         
        
            Live Readings
           
            Container 2
            
          </Text>

          <View className="flex-row justify-between mt-4">
            <View className="bg-green-100 px-4 py-3 rounded-xl w-[48%]">
              <Text className="text-gray-600">pH Level</Text>
              <Text className="text-3xl font-bold text-green-700">3.82</Text>
              <Text className="text-green-700">Mid-Fermentation</Text>
            </View>

            <View className="bg-blue-100 px-4 py-3 rounded-xl w-[48%]">
              <Text className="text-gray-600">Temperature</Text>
              <Text className="text-3xl font-bold text-blue-700">31.7°C</Text>
              <Text className="text-blue-700">Optimal Range</Text>
            </View>
          </View>

          {/* Container Type */}
          <View className="mt-5 bg-orange-100 px-4 py-3 rounded-xl">
            <Text className="text-gray-600">Container Type</Text>
            <Text className="text-xl font-bold text-orange-700">Glass</Text>
            <Text className="text-orange-700">a non-reactive, airtight, and transparent environment</Text>
          </View>
        </View>
          

          {/* Fermentation Stage */}
        <View className="mt-6 bg-white rounded-2xl p-5 shadow">
          <Text className="text-xl font-semibold text-gray-800">
            Current Fermentation Stage
          </Text>

          <View className="mt-4 bg-yellow-100 px-4 py-4 rounded-xl">
            <Text className="text-yellow-700 font-bold text-lg">Stage 3</Text>
            <Text className="text-yellow-700">Mid Fermentation</Text>
            <Text className="text-gray-700 mt-1">
              Acetic acid formation is active. pH is gradually decreasing.
              Ready for bottling soon.
            </Text>
          </View>
        </View>


          <View className="mt-6 bg-white rounded-2xl p-5 shadow">
          <Text className="text-xl font-semibold text-gray-800">
            Live Readings
           
            Container 3
            
          </Text>

          <View className="flex-row justify-between mt-4">
            <View className="bg-green-100 px-4 py-3 rounded-xl w-[48%]">
              <Text className="text-gray-600">pH Level</Text>
              <Text className="text-3xl font-bold text-green-700">3.82</Text>
              <Text className="text-green-700">Mid-Fermentation</Text>
            </View>

            <View className="bg-blue-100 px-4 py-3 rounded-xl w-[48%]">
              <Text className="text-gray-600">Temperature</Text>
              <Text className="text-3xl font-bold text-blue-700">31.7°C</Text>
              <Text className="text-blue-700">Optimal Range</Text>
            </View>
          </View>

          {/* Container Type */}
          <View className="mt-5 bg-orange-100 px-4 py-3 rounded-xl">
            <Text className="text-gray-600">Container Type</Text>
            <Text className="text-xl font-bold text-orange-700">plastic</Text>
            <Text className="text-orange-700">allows acetic acid bacteria to convert alcohol into acetic acid safely</Text>
          </View>
        </View>

       

        {/* Fermentation Stage */}
        <View className="mt-6 bg-white rounded-2xl p-5 shadow">
          <Text className="text-xl font-semibold text-gray-800">
            Current Fermentation Stage
          </Text>

          <View className="mt-4 bg-yellow-100 px-4 py-4 rounded-xl">
            <Text className="text-yellow-700 font-bold text-lg">Stage 2</Text>
            <Text className="text-yellow-700">Mid Fermentation</Text>
            <Text className="text-gray-700 mt-1">
              Acetic acid formation is active. pH is gradually decreasing.
            </Text>
          </View>
        </View>

        {/* Graph Placeholders */}
        <View className="mt-6 bg-white rounded-2xl p-5 shadow">
          <Text className="text-xl font-semibold text-gray-800">
            Fermentation Trends
          </Text>

          <View className="mt-4 h-40 bg-gray-200 rounded-xl flex items-center justify-center">
            <Text className="text-gray-500">pH Trend Graph</Text>
          </View>

          <View className="mt-4 h-40 bg-gray-200 rounded-xl flex items-center justify-center">
            <Text className="text-gray-500">Temperature Trend Graph</Text>
          </View>
        </View>

        {/* Alerts */}
        <View className="mt-6 mb-10 bg-white rounded-2xl p-5 shadow">
          <Text className="text-xl font-semibold text-gray-800">
            Recent Alerts
          </Text>

          <View className="mt-4 bg-red-100 px-4 py-3 rounded-xl">
            <Text className="text-red-700 font-semibold">
              pH dropping faster than expected.
            </Text>
          </View>

          <View className="mt-3 bg-blue-100 px-4 py-3 rounded-xl">
            <Text className="text-blue-700 font-semibold">
              Temperature stable at 31°C.
            </Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
 