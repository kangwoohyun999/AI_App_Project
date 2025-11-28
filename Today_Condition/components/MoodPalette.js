// components/MoodPalette.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getMonthMoodColors } from "../utils/storage";

export default function MoodPalette({ selectedDate }) {
  const [colors, setColors] = useState({});
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();

  useEffect(() => {
    (async () => {
      const data = await getMonthMoodColors(year, month);
      setColors(data);
    })();
  }, [selectedDate]);

  const days = Object.keys(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {year}년 {month + 1}월 감정 팔레트
      </Text>

      <View style={styles.grid}>
        {days.map((day) => (
          <View
            key={day}
            style={[styles.cell, { backgroundColor: colors[day] || "#D9D9D9" }]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 20 },
  title: { fontSize: 18, fontWeight: "600", marginBottom: 10 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
  cell: {
    width: "14.2%", // 7열 달력처럼
    aspectRatio: 1,
    borderRadius: 6,
    marginBottom: 6,
  },
});
