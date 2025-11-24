import React from 'react';
import { View, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function PieChartComponent({ positive = 0.0, negative = 0.0 }) {
  const pos = Math.round(positive * 100);
  const neg = Math.round(negative * 100);
  const data = [
    { name: '긍정', population: pos, color: '#ff6b6b', legendFontColor: '#fff', legendFontSize: 14 },
    { name: '부정', population: neg, color: '#4d90fe', legendFontColor: '#fff', legendFontSize: 14 },
  ];
  return (
    <View style={{ alignItems: 'center' }}>
      <PieChart
        data={data}
        width={screenWidth * 0.7}
        height={200}
        chartConfig={{
          backgroundGradientFrom: '#0f0b12',
          backgroundGradientTo: '#0f0b12',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="0"
        center={[165, 0]}
        hasLegend={false}
      />
    </View>
  );
}
