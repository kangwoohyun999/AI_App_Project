// src/components/Button.js
import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const Container = styled.TouchableOpacity`
  width: 100%;
  padding: 15px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, isFilled }) =>
    isFilled ? theme.main : theme.background};
  border: ${({ theme, isFilled }) =>
    isFilled ? 'none' : `1px solid ${theme.main}`};
`;

const Title = styled.Text`
  font-size: 16px;
  color: ${({ theme, isFilled }) => (isFilled ? theme.white : theme.main)};
`;

const Button = ({ title, onPress, containerStyle, textStyle, isFilled = true }) => {
  return (
    <Container isFilled={isFilled} style={containerStyle} onPress={onPress}>
      <Title isFilled={isFilled} style={textStyle}>
        {title}
      </Title>
    </Container>
  );
};

Button.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  containerStyle: PropTypes.object,
  textStyle: PropTypes.object,
  isFilled: PropTypes.bool,
};

export default Button;
