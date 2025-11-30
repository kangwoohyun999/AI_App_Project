import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  SectionList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { getEntries, clearEntries } from "../utils/storage";

export default function HistoryScreen({ navigation }) {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const all = await getEntries();
      const map = {};
      all.forEach((e) => {
        const d = e.date.slice(0, 10);
        if (!map[d]) map[d] = [];
        map[d].push(e);
      });
      const secs = Object.keys(map)
        .sort((a, b) => b.localeCompare(a))
        .map((d) => ({
          title: d,
          data: map[d].sort((a, b) => new Date(b.date) - new Date(a.date)),
        }));
      setSections(secs);
    };
    fetch();
    const unsub = navigation.addListener("focus", fetch);
    return unsub;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>지난 내용</Text>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.time}>
              {new Date(item.date).toLocaleTimeString()}
            </Text>
            <Text style={styles.text}>{item.text}</Text>
            <Text style={styles.meta}>
              키워드: {item.keywords.join(", ") || "없음"} | 감정:{" "}
              {item.sentiment.label}
            </Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>기록이 없습니다.</Text>}
      />

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.btnText}>뒤로</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "#8b0000" }]}
          onPress={async () => {
            await clearEntries();
            setSections([]);
          }}
        >
          <Text style={[styles.btnText, { color: "#ffffff" }]}>전체 삭제</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },

  title: {
    color: "#333",
    fontSize: 22,
    textAlign: "center",
    fontWeight: "700",
    marginBottom: 12,
  },

  // 날짜 섹션 헤더
  sectionHeader: {
    backgroundColor: "#ffffff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginTop: 14,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  sectionTitle: {
    color: "#333",
    fontSize: 16,
    fontWeight: "600",
  },

  // 각 기록 카드
  item: {
    backgroundColor: "#ffffff",
    padding: 14,
    borderRadius: 12,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  time: {
    color: "#777",
    fontSize: 12,
    marginBottom: 6,
  },

  text: {
    color: "#333",
    fontSize: 15,
    marginBottom: 8,
  },

  meta: {
    color: "#666",
    fontSize: 13,
  },

  empty: {
    color: "#999",
    textAlign: "center",
    marginTop: 40,
    fontSize: 14,
  },

  // 하단 버튼 영역
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },

  // 기본 버튼 (뒤로가기)
  btn: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 14,
    borderRadius: 12,
    marginHorizontal: 6,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  btnText: {
    color: "#333",
    fontSize: 15,
    fontWeight: "600",
  },

  // 삭제 버튼 강조 (빨강)
  deleteBtn: {
    backgroundColor: "#ff4d4d",
  },
});
