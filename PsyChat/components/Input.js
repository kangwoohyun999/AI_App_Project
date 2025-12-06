// src/components/Input.js
import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const Container = styled.View`
  width: 100%;
  margin-bottom: 10px;
`;

const Label = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.text};
  margin-bottom: 8px;
`;

const StyledInput = styled.TextInput`
  width: 100%
  height: 45px;
  padding: 10px;
  border-radius: 4px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.gray};
  font-size: 15px;
  color: ${({ theme }) => theme.text};
`;

const Input = ({
  label,
  value,
  onChangeText,
  onSubmitEditing,
  placeholder,
  isPassword,
  returnKeyType = 'next',
  keyboardType = 'default',
}) => {
  return (
    <Container>
      {label && <Label>{label}</Label>}
      <StyledInput
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        placeholder={placeholder}
        secureTextEntry={isPassword}
        returnKeyType={returnKeyType}
        keyboardType={keyboardType}
      />
    </Container>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  placeholder: PropTypes.string,
  isPassword: PropTypes.bool,
  returnKeyType: PropTypes.string,
  keyboardType: PropTypes.string,
};

export default Input;
