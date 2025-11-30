import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "CONDITION_ENTRIES_V2";

export async function saveEntry(entry) {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    const arr = raw ? JSON.parse(raw) : [];
    arr.push(entry);
    await AsyncStorage.setItem(KEY, JSON.stringify(arr));
    return true;
  } catch (e) {
    console.error("saveEntry error", e);
    return false;
  }
}

export async function getEntries() {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("getEntries error", e);
    return [];
  }
}

export async function getEntriesByDate(dateStr) {
  const all = await getEntries();
  return all
    .filter((e) => e.date.slice(0, 10) === dateStr)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function clearEntries() {
  try {
    await AsyncStorage.removeItem(KEY);
    return true;
  } catch (e) {
    console.error("clearEntries error", e);
    return false;
  }
}

export async function computeWordTimeSeries(days = 14) {
  const all = await getEntries();
  if (all.length === 0) {
    return { dates: [], words: [], data: {} };
  }
  const today = new Date();
  const dates = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    dates.push(d.toISOString().slice(0, 10));
  }

  const wordSet = new Set();
  all.forEach((e) => {
    Object.keys(e.counts || {}).forEach((w) => wordSet.add(w));
  });
  const words = Array.from(wordSet).slice(0, 10);

  const data = {};
  words.forEach((w) => (data[w] = []));

  dates.forEach((d) => {
    const dayEntries = all.filter((e) => e.date.slice(0, 10) === d);
    words.forEach((w) => {
      let sum = 0;
      dayEntries.forEach((e) => {
        sum += e.counts && e.counts[w] ? e.counts[w] : 0;
      });
      data[w].push(sum);
    });
  });

  return { dates, words, data };
}
// 날짜별 감정 색 저장
export async function saveMoodColor(date, color) {
  try {
    const stored = await AsyncStorage.getItem("moodColors");
    const json = stored ? JSON.parse(stored) : {};

    json[date] = color;

    await AsyncStorage.setItem("moodColors", JSON.stringify(json));
  } catch (e) {
    console.error("saveMoodColor error:", e);
  }
}

// 날짜별 감정색 전체 가져오기
export async function getMoodColors() {
  try {
    const stored = await AsyncStorage.getItem("moodColors");
    return stored ? JSON.parse(stored) : {};
  } catch (e) {
    console.error("getMoodColors error:", e);
    return {};
  }
}
