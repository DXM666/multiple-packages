import React, { InputHTMLAttributes, forwardRef } from 'react';
import styled, { css } from 'styled-components';
import { stringUtils } from '@multiple-packages/utils';

export type InputSize = 'small' | 'medium' | 'large';
export type InputStatus = 'default' | 'error' | 'success';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * 输入框大小
   */
  size?: InputSize;
  /**
   * 输入框状态
   */
  status?: InputStatus;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 前缀图标或文本
   */
  prefix?: React.ReactNode;
  /**
   * 后缀图标或文本
   */
  suffix?: React.ReactNode;
  /**
   * 错误提示文本
   */
  errorText?: string;
  /**
   * 帮助文本
   */
  helpText?: string;
  /**
   * 标签文本
   */
  label?: string;
  /**
   * 是否必填
   */
  required?: boolean;
  /**
   * 额外的CSS类名
   */
  className?: string;
}

const getSizeStyles = (size: InputSize) => {
  const sizes = {
    small: css`
      height: 32px;
      padding: 0 8px;
      font-size: 14px;
    `,
    medium: css`
      height: 40px;
      padding: 0 12px;
      font-size: 16px;
    `,
    large: css`
      height: 48px;
      padding: 0 16px;
      font-size: 18px;
    `,
  };

  return sizes[size];
};

const getStatusStyles = (status: InputStatus) => {
  const statuses = {
    default: css`
      border-color: #d9d9d9;
      
      &:hover {
        border-color: #40a9ff;
      }
      
      &:focus {
        border-color: #40a9ff;
        box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
      }
    `,
    error: css`
      border-color: #ff4d4f;
      
      &:hover {
        border-color: #ff4d4f;
      }
      
      &:focus {
        border-color: #ff4d4f;
        box-shadow: 0 0 0 2px rgba(255, 77, 79, 0.2);
      }
    `,
    success: css`
      border-color: #52c41a;
      
      &:hover {
        border-color: #52c41a;
      }
      
      &:focus {
        border-color: #52c41a;
        box-shadow: 0 0 0 2px rgba(82, 196, 26, 0.2);
      }
    `,
  };

  return statuses[status];
};

const InputContainer = styled.div`
  display: inline-block;
  width: 100%;
  margin-bottom: 16px;
`;

const InputLabel = styled.label<{ $required?: boolean }>`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  
  ${({ $required }) => $required && css`
    &::after {
      content: '*';
      color: #ff4d4f;
      margin-left: 4px;
    }
  `}
`;

const InputWrapper = styled.div<{ $size: InputSize; $disabled?: boolean }>`
  position: relative;
  display: inline-flex;
  width: 100%;
  align-items: center;
  
  ${({ $size }) => getSizeStyles($size)}
  
  ${({ $disabled }) => $disabled && css`
    cursor: not-allowed;
    opacity: 0.6;
  `}
`;

const StyledInput = styled.input<{ $status: InputStatus; $hasPrefix?: boolean; $hasSuffix?: boolean }>`
  width: 100%;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  outline: none;
  transition: all 0.3s;
  height: 100%;
  padding-left: ${({ $hasPrefix }) => ($hasPrefix ? '30px' : '12px')};
  padding-right: ${({ $hasSuffix }) => ($hasSuffix ? '30px' : '12px')};
  
  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
  
  ${({ $status }) => getStatusStyles($status)}
`;

const Prefix = styled.span`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
`;

const Suffix = styled.span`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
`;

const HelpText = styled.div<{ $isError?: boolean }>`
  margin-top: 4px;
  font-size: 12px;
  color: ${({ $isError }) => ($isError ? '#ff4d4f' : 'rgba(0, 0, 0, 0.45)')};
`;

/**
 * 输入框组件
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'medium',
      status = 'default',
      disabled = false,
      prefix,
      suffix,
      errorText,
      helpText,
      label,
      required = false,
      className,
      ...rest
    },
    ref
  ) => {
    // 如果有错误文本，状态设为error
    const inputStatus = errorText ? 'error' : status;
    
    return (
      <InputContainer className={className}>
        {label && (
          <InputLabel $required={required}>{label}</InputLabel>
        )}
        <InputWrapper $size={size} $disabled={disabled}>
          {prefix && <Prefix>{prefix}</Prefix>}
          <StyledInput
            ref={ref}
            $status={inputStatus}
            $hasPrefix={!!prefix}
            $hasSuffix={!!suffix}
            disabled={disabled}
            {...rest}
          />
          {suffix && <Suffix>{suffix}</Suffix>}
        </InputWrapper>
        {(errorText || helpText) && (
          <HelpText $isError={!!errorText}>
            {errorText || helpText}
          </HelpText>
        )}
      </InputContainer>
    );
  }
);

Input.displayName = 'Input';

export default Input;
