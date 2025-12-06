import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import ChatBubble from "../components/ChatBubble";
import { extractKeywordsWithWeights } from "../utils/keywordExtractor";
import { estimateSentimentFromWeighted } from "../utils/sentiment";
import { saveEntry, getEntriesByDate } from "../utils/storage";
import { emotionToColor } from "../utils/emotionToColor";
import { saveMoodColor } from "../utils/storage";

function formatDateISO(d) {
  return d.toISOString().slice(0, 10);
}

export default function ChatScreen({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [todayEntries, setTodayEntries] = useState([]);

  useEffect(() => {
    fetchForDate(selectedDate);
  }, [selectedDate]);

  const fetchForDate = async (d) => {
    const arr = await getEntriesByDate(formatDateISO(d));
    setTodayEntries(arr);
  };

  const changeDate = (deltaDays) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + deltaDays);
    setSelectedDate(d);
  };

  const handleSend = async () => {
    console.log("handleSend 실행됨, text:", text);
    if (!text.trim()) return;
    const { keywords, counts, weighted } = extractKeywordsWithWeights(text);
    const sentiment = estimateSentimentFromWeighted(weighted);

    // ⭐ 오늘의 감정색 저장 기능 추가
    const today = formatDateISO(selectedDate);
    await saveMoodColor(today, sentiment.label);

    const entry = {
      id: Date.now().toString(),
      date: new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        new Date().getHours(),
        new Date().getMinutes(),
        new Date().getSeconds()
      ).toISOString(),
      text: text.trim(),
      keywords,
      counts,
      weighted,
      sentiment,
    };
    await saveEntry(entry);
    setMessages((prev) => [
      ...prev,
      { id: entry.id, text: entry.text, isUser: true, date: entry.date },
    ]);
    const botReply = generateFeedback(entry);
    setMessages((prev) => [
      ...prev,
      {
        id: entry.id + "_bot",
        text: botReply,
        isUser: false,
        date: new Date().toISOString(),
      },
    ]);
    setText("");
    fetchForDate(selectedDate);
  };

  const generateFeedback = (entry) => {
    if (!entry || !entry.sentiment) return "작성해주셔서 감사합니다.";
    if (entry.sentiment.label === "positive")
      return "좋은 일이 많았나 보네요. 계속 잘 챙기세요!";
    if (entry.sentiment.label === "negative")
      return "오늘 힘든 날이었군요. 괜찮으실까요? 필요하면 조금 더 적어보세요.";
    return "평범한 하루였네요. 더 이야기해주셔도 좋아요.";
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.dateRow}>
        <TouchableOpacity onPress={() => changeDate(-1)} style={styles.dateBtn}>
          <Text style={styles.dateBtnText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.dateText}>{formatDateISO(selectedDate)}</Text>
        <TouchableOpacity onPress={() => changeDate(1)} style={styles.dateBtn}>
          <Text style={styles.dateBtnText}>{">"}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.messageList}>
        {messages.map((m) => (
          <ChatBubble
            key={m.id}
            text={m.text}
            isUser={m.isUser}
            date={new Date(m.date).toLocaleTimeString()}
          />
        ))}
      </ScrollView>

      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="내용을 입력하세요"
          placeholderTextColor="#aaa"
          value={text}
          onChangeText={setText}
          multiline
        />

        <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
          <Text style={{ color: "#fff" }}>전송</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <Text style={{ color: "#fff" }}>뒤로</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 0,
  },

  // 날짜 바
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e6e6e6",
  },
  dateBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  dateBtnText: {
    color: "#333",
    fontSize: 22,
    fontWeight: "600",
  },
  dateText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "600",
  },

  // 메시지 목록
  messageList: {
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: 10,
  },

  // 입력 영역
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderTopColor: "#e6e6e6",
  },

  input: {
    flex: 1,
    backgroundColor: "#f1f2f6",
    color: "#000",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    fontSize: 15,
    maxHeight: 130,
  },

  sendBtn: {
    marginLeft: 10,
    backgroundColor: "#4C6EF5",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },

  // 뒤로가기 버튼
  backBtn: {
    position: "absolute",
    top: 55,
    left: 15,
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    zIndex: 50,
  },
};
