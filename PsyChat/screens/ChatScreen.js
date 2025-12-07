// screens/ChatScreen.js
import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ChatBubble from "../components/ChatBubble";
import { extractKeywordsWithWeights } from "../utils/keywordExtractor";
import { estimateSentimentFromWeighted } from "../utils/sentiment";
import { saveEntry, getEntriesByDate, saveMoodColor } from "../utils/storage";

function formatDateISO(d) {
  return d.toISOString().slice(0, 10);
}

function formatDateKorean(d) {
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const date = d.getDate();
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const dayName = days[d.getDay()];
  return `${year}년 ${month}월 ${date}일 (${dayName})`;
}

export default function ChatScreen({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    fetchForDate(selectedDate);
  }, [selectedDate]);

  // 메시지 추가 시 자동 스크롤
  useEffect(() => {
    if (scrollViewRef.current && messages.length > 0) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const fetchForDate = async (d) => {
    try {
      setIsLoading(true);
      const entries = await getEntriesByDate(formatDateISO(d));
      
      // 기존 entries를 메시지 형태로 변환
      const loadedMessages = [];
      entries.forEach((entry) => {
        // 사용자 메시지
        loadedMessages.push({
          id: entry.id,
          text: entry.text,
          isUser: true,
          date: entry.date,
        });
        
        // 봇 응답 (저장된 경우)
        if (entry.botReply) {
          loadedMessages.push({
            id: `${entry.id}_bot`,
            text: entry.botReply,
            isUser: false,
            date: entry.date,
          });
        } else {
          // 봇 응답이 없으면 생성
          const botReply = generateFeedback(entry);
          loadedMessages.push({
            id: `${entry.id}_bot`,
            text: botReply,
            isUser: false,
            date: entry.date,
          });
        }
      });
      
      setMessages(loadedMessages);
    } catch (error) {
      console.error("데이터 로딩 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const changeDate = (deltaDays) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + deltaDays);
    setSelectedDate(d);
  };

  const isToday = () => {
    const today = new Date();
    return formatDateISO(selectedDate) === formatDateISO(today);
  };

  const handleSend = async () => {
    if (!text.trim() || isSending) return;
    
    try {
      setIsSending(true);

      // 감성 분석
      const { keywords, counts, weighted } = extractKeywordsWithWeights(text);
      const sentiment = estimateSentimentFromWeighted(weighted);

      console.log(`감정: ${getLabelText(sentiment.label)} ${getLabelEmoji(sentiment.label)}`);
      console.log(`점수: ${sentiment.score} (신뢰도: ${sentiment.confidence})`);
      
      // 오늘의 감정색 저장
      const today = formatDateISO(selectedDate);
      await saveMoodColor(today, sentiment.label);

      // Entry 생성 (selectedDate의 날짜 + 현재 시간)
      const now = new Date();
      const entryDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        now.getHours(),
        now.getMinutes(),
        now.getSeconds()
      );

      const botReply = generateFeedback({ text: text.trim(), sentiment, keywords });

      const entry = {
        id: Date.now().toString(),
        date: entryDate.toISOString(),
        text: text.trim(),
        keywords,
        counts,
        weighted,
        sentiment,
        botReply, // 봇 응답 저장
      };

      await saveEntry(entry);

      // 메시지 추가
      setMessages((prev) => [
        ...prev,
        {
          id: entry.id,
          text: entry.text,
          isUser: true,
          date: entry.date,
        },
        {
          id: `${entry.id}_bot`,
          text: botReply,
          isUser: false,
          date: new Date().toISOString(),
        },
      ]);

      setText("");
    } catch (error) {
      console.error("메시지 전송 실패:", error);
      alert("메시지 전송에 실패했습니다.");
    } finally {
      setIsSending(false);
    }
  };

  const generateFeedback = (entry) => {
    const { sentiment } = entry;
  
    if (sentiment.label === 'very_positive') {
      eturn `정말 멋진 하루였네요! ${getLabelEmoji(sentiment.label)} (신뢰도: ${Math.round(sentiment.confidence * 100)}%)`;
    }
  
    if (sentiment.label === 'positive') {
      return `좋은 일이 있었나 보네요! ${getLabelEmoji(sentiment.label)}`;
    }

    const { label, score } = entry.sentiment;
    const keywords = entry.keywords || [];

    // 긍정적인 감정
    if (label === "positive") {
      if (score > 0.7) {
        return `정말 좋은 하루였나 봐요! ✨ ${
          keywords.length > 0 
            ? `특히 '${keywords.slice(0, 2).join("', '")}' 같은 일들이 있었네요. ` 
            : ""
        }이런 기분 계속 유지하세요!`;
      }
      return `좋은 일이 있었나 보네요. 😊 ${
        keywords.length > 0 
          ? `'${keywords[0]}'에 대해 더 얘기해볼까요?` 
          : "계속 잘 챙기세요!"
      }`;
    }

    // 부정적인 감정
    if (label === "negative") {
      if (score < -0.7) {
        return `오늘 정말 힘든 하루였군요. 😢 괜찮으신가요? 더 이야기하고 싶으면 언제든 적어주세요. 당신의 감정을 존중합니다.`;
      }
      return `조금 힘든 하루였나 봐요. 😔 ${
        keywords.length > 0 
          ? `'${keywords[0]}' 때문에 그러셨나요? ` 
          : ""
      }필요하면 더 이야기해주세요.`;
    }

    // 중립적인 감정
    return `평범한 하루였네요. 🌤️ ${
      keywords.length > 0 
        ? `'${keywords[0]}'에 대해 더 말씀해주시겠어요?` 
        : "더 이야기해주셔도 좋아요."
    }`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        {/* 헤더 */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#2C3E50" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>일기 작성</Text>

          <View style={{ width: 40 }} />
        </View>

        {/* 날짜 선택 */}
        <View style={styles.dateRow}>
          <TouchableOpacity
            onPress={() => changeDate(-1)}
            style={styles.dateBtn}
          >
            <Ionicons name="chevron-back" size={24} color="#4A90E2" />
          </TouchableOpacity>

          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>{formatDateKorean(selectedDate)}</Text>
            {isToday() && <Text style={styles.todayBadge}>오늘</Text>}
          </View>

          <TouchableOpacity
            onPress={() => changeDate(1)}
            style={styles.dateBtn}
            disabled={isToday()}
          >
            <Ionicons
              name="chevron-forward"
              size={24}
              color={isToday() ? "#BDC3C7" : "#4A90E2"}
            />
          </TouchableOpacity>
        </View>

        {/* 메시지 목록 */}
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4A90E2" />
          </View>
        ) : (
          <ScrollView
            ref={scrollViewRef}
            style={styles.messageList}
            contentContainerStyle={styles.messageListContent}
            showsVerticalScrollIndicator={false}
          >
            {messages.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Ionicons name="chatbubbles-outline" size={64} color="#BDC3C7" />
                <Text style={styles.emptyText}>
                  {isToday() 
                    ? "오늘은 어떤 하루였나요?\n아래에 일기를 작성해보세요." 
                    : "이 날짜에는 작성된 일기가 없습니다."}
                </Text>
              </View>
            ) : (
              messages.map((m) => (
                <ChatBubble
                  key={m.id}
                  text={m.text}
                  isUser={m.isUser}
                  date={new Date(m.date).toLocaleTimeString("ko-KR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                />
              ))
            )}
          </ScrollView>
        )}

        {/* 입력 영역 */}
        <View style={styles.inputContainer}>
          {!isToday() && (
            <View style={styles.disabledOverlay}>
              <Text style={styles.disabledText}>
                오늘 날짜만 일기를 작성할 수 있습니다
              </Text>
            </View>
          )}

          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="오늘 하루를 기록해보세요..."
              placeholderTextColor="#95A5A6"
              value={text}
              onChangeText={setText}
              multiline
              maxLength={1000}
              editable={isToday() && !isSending}
            />

            <TouchableOpacity
              style={[
                styles.sendBtn,
                (!text.trim() || isSending || !isToday()) && styles.sendBtnDisabled,
              ]}
              onPress={handleSend}
              disabled={!text.trim() || isSending || !isToday()}
            >
              {isSending ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Ionicons name="send" size={20} color="#fff" />
              )}
            </TouchableOpacity>
          </View>

          {text.length > 0 && (
            <Text style={styles.charCount}>{text.length} / 1000</Text>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  keyboardView: {
    flex: 1,
  },

  // 헤더
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },

  backBtn: {
    padding: 8,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2C3E50",
  },

  // 날짜 바
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },

  dateBtn: {
    padding: 8,
  },

  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  dateText: {
    color: "#2C3E50",
    fontSize: 16,
    fontWeight: "600",
  },

  todayBadge: {
    backgroundColor: "#4A90E2",
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },

  // 메시지 목록
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  messageList: {
    flex: 1,
  },

  messageListContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },

  emptyText: {
    color: "#95A5A6",
    fontSize: 16,
    marginTop: 16,
    textAlign: "center",
    lineHeight: 24,
  },

  // 입력 영역
  inputContainer: {
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },

  disabledOverlay: {
    backgroundColor: "#FFF3CD",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },

  disabledText: {
    color: "#856404",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "600",
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
  },

  input: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    color: "#2C3E50",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    fontSize: 16,
    maxHeight: 120,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },

  sendBtn: {
    backgroundColor: "#4A90E2",
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },

  sendBtnDisabled: {
    backgroundColor: "#BDC3C7",
    opacity: 0.6,
  },

  charCount: {
    fontSize: 12,
    color: "#95A5A6",
    textAlign: "right",
    marginTop: 4,
  },
});