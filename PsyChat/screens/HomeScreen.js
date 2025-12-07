// screens/HomeScreen.js
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import PieChartComponent from "../components/PieChartComponent";
import { getEntries } from "../utils/storage";

export default function HomeScreen({ navigation }) {
  const [positiveRatio, setPositiveRatio] = useState(0.0);
  const [negativeRatio, setNegativeRatio] = useState(0.0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
    
    // 화면 포커스 시 데이터 새로고침
    const unsubscribe = navigation.addListener("focus", () => {
      loadData();
    });

    return unsubscribe;
  }, [navigation]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const entries = await getEntries();
      
      if (!entries || entries.length === 0) {
        setPositiveRatio(0.0);
        setNegativeRatio(0.0);
        return;
      }

      const posScore = entries.reduce(
        (acc, e) => acc + (e.sentiment?.label === "positive" ? 1 : 0),
        0
      );
      const negScore = entries.reduce(
        (acc, e) => acc + (e.sentiment?.label === "negative" ? 1 : 0),
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
    } catch (error) {
      console.error("데이터 로딩 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 상단: 제목, 차트, 통계 */}
        <View style={styles.topSection}>
          <Text style={styles.title}>누적 상태</Text>

          <PieChartComponent 
            positive={positiveRatio} 
            negative={negativeRatio} 
          />

          <Text style={styles.ratioText}>
            부정: {Math.round(negativeRatio * 100)}% | 긍정: {Math.round(positiveRatio * 100)}%
          </Text>

          {/* 통계 버튼 */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Graph")}
            >
              <Text style={styles.buttonText}>📊{'\n'}누적 그래프</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("History")}
            >
              <Text style={styles.buttonText}>📝{'\n'}지난 기록</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Calendar")}
            >
              <Text style={styles.buttonText}>📅{'\n'}감정 캘린더</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 음악 추천 카드 섹션 (선택사항 - 화면이 없으면 주석 처리) */}
        
        <View style={styles.musicSection}>
          <Text style={styles.sectionTitle}>🎵 음악 추천</Text>
          
          <TouchableOpacity
            style={styles.musicCard}
            onPress={() => {
              // TODO: 음악추천 화면 구현 후 활성화
              alert("음악 추천 기능은 곧 추가될 예정입니다!");
            }}
          >
            <Text style={styles.musicCardEmoji}>😞</Text>
            <Text style={styles.musicCardText}>기분 안좋은 날</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.musicCard}
            onPress={() => {
              alert("음악 추천 기능은 곧 추가될 예정입니다!");
            }}
          >
            <Text style={styles.musicCardEmoji}>😊</Text>
            <Text style={styles.musicCardText}>기분 좋은 날</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.musicCard}
            onPress={() => {
              alert("추천 목록 기능은 곧 추가될 예정입니다!");
            }}
          >
            <Text style={styles.musicCardEmoji}>🎧</Text>
            <Text style={styles.musicCardText}>추천 목록</Text>
          </TouchableOpacity>
        </View>
       

        {/* 하단: 안내 문구 + 채팅 버튼 */}
        <View style={styles.bottomSection}>
          <Text style={styles.promptText}>
            안녕하세요. 오늘은 어떤 하루였나요?
          </Text>

          <TouchableOpacity
            style={styles.chatInputButton}
            onPress={() => navigation.navigate("Chat")}
          >
            <Text style={styles.chatInputText}>💬 눌러서 채팅하기</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },

  topSection: {
    alignItems: "center",
    marginBottom: 30,
  },

  title: {
    color: "#2C3E50",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
  },

  ratioText: {
    color: "#7F8C8D",
    fontSize: 16,
    marginTop: 16,
    marginBottom: 24,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 12,
  },

  button: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 100,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  buttonText: {
    color: "#2C3E50",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 20,
  },

  // 음악 섹션 (선택사항)
  musicSection: {
    marginBottom: 30,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2C3E50",
    marginBottom: 16,
  },

  musicCard: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  musicCardEmoji: {
    fontSize: 32,
    marginRight: 16,
  },

  musicCardText: {
    color: "#2C3E50",
    fontSize: 16,
    fontWeight: "600",
  },

  bottomSection: {
    alignItems: "center",
    gap: 16,
  },

  promptText: {
    color: "#7F8C8D",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 8,
  },

  chatInputButton: {
    width: "100%",
    backgroundColor: "#4A90E2",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#4A90E2",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },

  chatInputText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  },
});
