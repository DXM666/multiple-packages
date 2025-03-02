import React, { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 按钮变体样式
   */
  variant?: ButtonVariant;
  /**
   * 按钮尺寸
   */
  size?: ButtonSize;
  /**
   * 是否为轮廓按钮
   */
  outline?: boolean;
  /**
   * 是否为块级按钮（宽度100%）
   */
  block?: boolean;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 是否显示加载状态
   */
  loading?: boolean;
  /**
   * 子元素
   */
  children: React.ReactNode;
}

const getVariantStyles = (variant: ButtonVariant, outline: boolean) => {
  const variants = {
    primary: css`
      ${outline
        ? css`
            color: #0d6efd;
            border-color: #0d6efd;
            background-color: transparent;
            &:hover:not(:disabled) {
              background-color: #0d6efd;
              color: white;
            }
          `
        : css`
            background-color: #0d6efd;
            border-color: #0d6efd;
            color: white;
            &:hover:not(:disabled) {
              background-color: #0b5ed7;
              border-color: #0a58ca;
            }
          `}
    `,
    secondary: css`
      ${outline
        ? css`
            color: #6c757d;
            border-color: #6c757d;
            background-color: transparent;
            &:hover:not(:disabled) {
              background-color: #6c757d;
              color: white;
            }
          `
        : css`
            background-color: #6c757d;
            border-color: #6c757d;
            color: white;
            &:hover:not(:disabled) {
              background-color: #5c636a;
              border-color: #565e64;
            }
          `}
    `,
    success: css`
      ${outline
        ? css`
            color: #198754;
            border-color: #198754;
            background-color: transparent;
            &:hover:not(:disabled) {
              background-color: #198754;
              color: white;
            }
          `
        : css`
            background-color: #198754;
            border-color: #198754;
            color: white;
            &:hover:not(:disabled) {
              background-color: #157347;
              border-color: #146c43;
            }
          `}
    `,
    danger: css`
      ${outline
        ? css`
            color: #dc3545;
            border-color: #dc3545;
            background-color: transparent;
            &:hover:not(:disabled) {
              background-color: #dc3545;
              color: white;
            }
          `
        : css`
            background-color: #dc3545;
            border-color: #dc3545;
            color: white;
            &:hover:not(:disabled) {
              background-color: #bb2d3b;
              border-color: #b02a37;
            }
          `}
    `,
    warning: css`
      ${outline
        ? css`
            color: #ffc107;
            border-color: #ffc107;
            background-color: transparent;
            &:hover:not(:disabled) {
              background-color: #ffc107;
              color: #000;
            }
          `
        : css`
            background-color: #ffc107;
            border-color: #ffc107;
            color: #000;
            &:hover:not(:disabled) {
              background-color: #ffca2c;
              border-color: #ffc720;
            }
          `}
    `,
    info: css`
      ${outline
        ? css`
            color: #0dcaf0;
            border-color: #0dcaf0;
            background-color: transparent;
            &:hover:not(:disabled) {
              background-color: #0dcaf0;
              color: #000;
            }
          `
        : css`
            background-color: #0dcaf0;
            border-color: #0dcaf0;
            color: #000;
            &:hover:not(:disabled) {
              background-color: #31d2f2;
              border-color: #25cff2;
            }
          `}
    `,
  };

  return variants[variant];
};

const getSizeStyles = (size: ButtonSize) => {
  const sizes = {
    small: css`
      padding: 0.25rem 0.5rem;
      font-size: 0.875rem;
      border-radius: 0.2rem;
    `,
    medium: css`
      padding: 0.375rem 0.75rem;
      font-size: 1rem;
      border-radius: 0.25rem;
    `,
    large: css`
      padding: 0.5rem 1rem;
      font-size: 1.25rem;
      border-radius: 0.3rem;
    `,
  };

  return sizes[size];
};

const StyledButton = styled.button<ButtonProps>`
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  border: 1px solid transparent;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  ${({ variant = 'primary', outline = false }) => getVariantStyles(variant, outline)}
  ${({ size = 'medium' }) => getSizeStyles(size)}
  ${({ block }) =>
    block &&
    css`
      display: block;
      width: 100%;
    `}

  &:disabled,
  &.disabled {
    opacity: 0.65;
    pointer-events: none;
  }

  ${({ loading }) =>
    loading &&
    css`
      position: relative;
      pointer-events: none;
      
      &::after {
        content: '';
        position: absolute;
        width: 1em;
        height: 1em;
        top: calc(50% - 0.5em);
        right: 0.5em;
        border: 0.15em solid currentColor;
        border-right-color: transparent;
        border-radius: 50%;
        animation: button-loading-spinner 0.75s linear infinite;
      }
      
      @keyframes button-loading-spinner {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    `}
`;

/**
 * 按钮组件，支持多种样式和尺寸
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  outline = false,
  block = false,
  disabled = false,
  loading = false,
  children,
  ...rest
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      outline={outline}
      block={block}
      disabled={disabled || loading}
      loading={loading}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
