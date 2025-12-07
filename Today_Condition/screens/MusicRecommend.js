import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import { saveRecommendedSong } from "../utils/storage";

export default function MusicRecommend({ route, navigation }) {
  const { mood } = route.params;

  // ⭐ 유튜브 링크 포함된 노래 리스트
  const badList = [
    {
      title: "감성 발라드 1",
      youtube: "https://www.youtube.com/watch?v=Soa3gO7tL-c",
    },
    {
      title: "슬픈 위로곡 2",
      youtube: "https://www.youtube.com/watch?v=ZbZSe6N_BXs",
    },
    {
      title: "비오는 날 감성곡 3",
      youtube: "https://www.youtube.com/watch?v=JGwWNGJdvx8",
    },
  ];

  const goodList = [
    {
      title: "아이유 — 좋은 날",
      youtube: "https://www.youtube.com/watch?v=jeqdYqsrsA0",
    },
    {
      title: "볼빨간사춘기 — 여행",
      youtube: "https://www.youtube.com/watch?v=2ZISE8zZBok",
    },
    {
      title: "악뮤 — 200%",
      youtube: "https://www.youtube.com/watch?v=0Oi8jDMvd_w",
    },
  ];

  const songs = mood === "bad" ? badList : goodList;

  const [selectedSong, setSelectedSong] = useState(null);

  // ⭐ 유튜브 영상 ID 추출
  const getYoutubeId = (url) => {
    const regex = /v=([^&]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  // ⭐ 랜덤 추천 함수
  const recommendSong = async () => {
    const randomIndex = Math.floor(Math.random() * songs.length);
    const song = songs[randomIndex];

    setSelectedSong(song);
  };

  // 들어오자마자 자동 추천 실행
  useEffect(() => {
    recommendSong();
  }, []);

  return (
    <View style={styles.container}>
      {/* 🔙 뒤로가기 */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>← 뒤로가기</Text>
      </TouchableOpacity>

      {/* 제목 */}
      <Text style={styles.title}>
        {mood === "bad" ? "😞 기분 안좋은 날 추천곡" : "😊 기분 좋은 날 추천곡"}
      </Text>

      {selectedSong && (
        <>
          {/* ⭐ 썸네일 */}
          <Image
            style={styles.thumbnail}
            source={{
              uri: `https://img.youtube.com/vi/${getYoutubeId(
                selectedSong.youtube
              )}/hqdefault.jpg`,
            }}
          />

          {/* 노래 제목 */}
          <Text style={styles.songTitle}>🎧 {selectedSong.title}</Text>

          {/* 유튜브로 이동 */}
          <TouchableOpacity
            style={styles.playBtn}
            onPress={() => Linking.openURL(selectedSong.youtube)}
          >
            <Text style={styles.playBtnText}>▶ 유튜브에서 듣기</Text>
          </TouchableOpacity>
        </>
      )}

      {/* 다시 추천 */}
      <TouchableOpacity style={styles.reBtn} onPress={recommendSong}>
        <Text style={styles.reBtnText}>다른 노래 추천받기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: "center" },

  backBtn: { alignSelf: "flex-start", marginBottom: 10 },
  backText: { fontSize: 18 },

  title: { fontSize: 24, fontWeight: "700", marginBottom: 20 },

  thumbnail: {
    width: "100%", // 화면 가로 전체
    aspectRatio: 16 / 9, // 유튜브 썸네일 비율 유지
    borderRadius: 12,
    resizeMode: "contain", // 자르지 않고 전체 보이게
    backgroundColor: "#000", // 검정 배경(썸네일 주변 빈 공간을 자연스럽게)
  },

  songTitle: { fontSize: 20, fontWeight: "600", marginBottom: 12 },

  playBtn: {
    backgroundColor: "#FF0000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  playBtnText: { color: "#fff", fontSize: 16, fontWeight: "600" },

  reBtn: {
    marginTop: 20,
    padding: 14,
    backgroundColor: "#4C6EF5",
    borderRadius: 12,
    alignItems: "center",
  },

  reBtnText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
