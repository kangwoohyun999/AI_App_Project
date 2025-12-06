import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
 position: absolute;
 width: 100%;
 height: 100%;
 justify-content: center;
 align-items: center;
 background-color: rgba(0,0,0,0.3);
`;

export default () => (
 <Container>
  <ActivityIndicator size="large"/>
 </Container>
);
