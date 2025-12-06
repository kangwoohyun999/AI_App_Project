import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import PieChartComponent from "../components/PieChartComponent";
import { getEntries } from "../utils/storage";

export default function HomeScreen({ navigation }) {
  const [positiveRatio, setPositiveRatio] = useState(0.0);
  const [negativeRatio, setNegativeRatio] = useState(0.0);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      const entries = await getEntries();
      const posScore = entries.reduce(
        (acc, e) => acc + (e.sentiment.label === "positive" ? 1 : 0),
        0
      );
      const negScore = entries.reduce(
        (acc, e) => acc + (e.sentiment.label === "negative" ? 1 : 0),
        0
      );
      const total = posScore + negScore;
      if (total === 0) {
        setPositiveRatio(0.0);
        setNegativeRatio(0.0);
      } else {
        setPositiveRatio(posScore / total);
        setNegativeRatio(negScore / total);
      }
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      {/* 상단: 제목, 차트, 카드 버튼 */}
      <View style={styles.topSection}>
        <Text style={styles.title}>누적 상태</Text>

        <PieChartComponent positive={positiveRatio} negative={negativeRatio} />

        <Text style={styles.ratioText}>
          부정 : {Math.round(negativeRatio * 100)}% , 긍정 :{" "}
          {Math.round(positiveRatio * 100)}%
        </Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("그래프")}
          >
            <Text style={styles.buttonText}>누적 상태 그래프</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("기록")}
          >
            <Text style={styles.buttonText}>지난 내용 보기</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* ✨ 음악 추천 카드 섹션 */}
      <View style={styles.musicSection}>
        <TouchableOpacity
          style={styles.musicCard}
          onPress={() => navigation.navigate("음악추천", { mood: "bad" })}
        >
          <Text style={styles.musicCardText}>😞 기분 안좋은 날\n노래 추천</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.musicCard}
          onPress={() => navigation.navigate("음악추천", { mood: "good" })}
        >
          <Text style={styles.musicCardText}>😊 기분 좋은 날\n노래 추천</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.musicCard}
          onPress={() => navigation.navigate("추천목록")}
        >
          <Text style={styles.musicCardText}>🎧 추천받은\n노래 목록</Text>
        </TouchableOpacity>
      </View>
      {/* 하단: 안내 문구 + 캘린더 / 채팅 버튼 */}
      <View style={styles.bottomSection}>
        <Text style={styles.promptText}>
          안녕하세요. 오늘은 어떤 하루였나요?
        </Text>

        <TouchableOpacity
          style={styles.calendarBtn}
          onPress={() => navigation.navigate("캘린더")}
        >
          <Text style={styles.calendarBtnText}>📅 감정 캘린더 보기</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.chatInputButton}
          onPress={() => navigation.navigate("챗봇")}
        >
          <Text style={styles.chatInputText}>눌러서 채팅하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // 전체 레이아웃
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  topSection: {
    flex: 1,
    alignItems: "center",
    paddingTop: 10,
  },

  bottomSection: {
    paddingBottom: 20,
    alignItems: "center",
    gap: 14,
  },

  title: {
    color: "#333",
    fontSize: 28,
    fontWeight: "700",
    marginTop: 10,
  },

  ratioText: {
    color: "#555",
    fontSize: 18,
    marginVertical: 12,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },

  button: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
    marginHorizontal: 6,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  buttonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "600",
  },

  promptText: {
    color: "#444",
    fontSize: 16,
    marginBottom: 4,
  },

  calendarBtn: {
    width: "90%",
    backgroundColor: "#4C6EF5",
    padding: 16,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 3 },
  },

  calendarBtnText: {
    color: "#fff",
    fontSize: 18,
  },

  chatInputButton: {
    width: "90%",
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  chatInputText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "600",
  },
  musicSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 20,
  },

  musicCard: {
    flex: 1,
    backgroundColor: "#ffffff",
    marginHorizontal: 5,
    padding: 20,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  musicCardText: {
    color: "#333",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
});
