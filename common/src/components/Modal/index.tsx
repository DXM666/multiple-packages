import React, { useEffect, useRef } from 'react';
import styled, { css, keyframes } from 'styled-components';
import Button from '../Button';

export interface ModalProps {
  /**
   * 是否显示模态框
   */
  visible: boolean;
  /**
   * 模态框标题
   */
  title?: React.ReactNode;
  /**
   * 模态框内容
   */
  children: React.ReactNode;
  /**
   * 模态框宽度
   */
  width?: string | number;
  /**
   * 是否显示关闭按钮
   */
  closable?: boolean;
  /**
   * 是否显示遮罩层
   */
  mask?: boolean;
  /**
   * 点击遮罩层是否可以关闭
   */
  maskClosable?: boolean;
  /**
   * 是否显示底部内容
   */
  footer?: React.ReactNode | boolean;
  /**
   * 确认按钮文本
   */
  okText?: string;
  /**
   * 取消按钮文本
   */
  cancelText?: string;
  /**
   * 确认按钮点击回调
   */
  onOk?: () => void;
  /**
   * 取消按钮点击回调
   */
  onCancel?: () => void;
  /**
   * 关闭后回调
   */
  afterClose?: () => void;
  /**
   * 确认按钮加载状态
   */
  confirmLoading?: boolean;
  /**
   * 是否居中显示
   */
  centered?: boolean;
  /**
   * 额外的CSS类名
   */
  className?: string;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const slideIn = keyframes`
  from {
    transform: translate(-50%, -70%);
  }
  to {
    transform: translate(-50%, -50%);
  }
`;

const slideOut = keyframes`
  from {
    transform: translate(-50%, -50%);
  }
  to {
    transform: translate(-50%, -70%);
  }
`;

const ModalMask = styled.div<{ $visible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.45);
  z-index: 1000;
  display: ${({ $visible }) => ($visible ? 'block' : 'none')};
  animation: ${({ $visible }) =>
    $visible
      ? css`
          ${fadeIn} 0.3s ease-in-out
        `
      : css`
          ${fadeOut} 0.3s ease-in-out
        `};
`;

const ModalWrapper = styled.div<{ $visible: boolean; $centered?: boolean }>`
  position: fixed;
  top: ${({ $centered }) => ($centered ? '50%' : '100px')};
  left: 50%;
  transform: ${({ $centered }) => ($centered ? 'translate(-50%, -50%)' : 'translateX(-50%)')};
  z-index: 1001;
  display: ${({ $visible }) => ($visible ? 'block' : 'none')};
  animation: ${({ $visible, $centered }) =>
    $visible
      ? $centered
        ? css`
            ${slideIn} 0.3s ease-in-out
          `
        : css`
            ${fadeIn} 0.3s ease-in-out
          `
      : $centered
      ? css`
          ${slideOut} 0.3s ease-in-out
        `
      : css`
          ${fadeOut} 0.3s ease-in-out
        `};
`;

const ModalContent = styled.div<{ $width?: string | number }>`
  position: relative;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: ${({ $width }) => ($width ? (typeof $width === 'number' ? `${$width}px` : $width) : '520px')};
  max-width: calc(100vw - 32px);
  margin: 0 auto;
`;

const ModalHeader = styled.div`
  padding: 16px 24px;
  color: rgba(0, 0, 0, 0.85);
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  border-radius: 4px 4px 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ModalTitle = styled.div`
  margin: 0;
  font-size: 16px;
  line-height: 22px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  word-wrap: break-word;
`;

const CloseButton = styled.button`
  position: relative;
  background: transparent;
  border: 0;
  outline: 0;
  width: 22px;
  height: 22px;
  font-size: 16px;
  line-height: 22px;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.45);
  transition: color 0.3s;
  
  &:hover {
    color: rgba(0, 0, 0, 0.75);
  }
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 16px;
    height: 2px;
    background-color: currentColor;
    top: 50%;
    left: 50%;
  }
  
  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }
  
  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;

const ModalBody = styled.div`
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
`;

const ModalFooter = styled.div`
  padding: 10px 16px;
  text-align: right;
  background: transparent;
  border-top: 1px solid #f0f0f0;
  border-radius: 0 0 4px 4px;
  
  & > button + button {
    margin-left: 8px;
  }
`;

/**
 * 模态框组件
 */
export const Modal: React.FC<ModalProps> = ({
  visible = false,
  title,
  children,
  width = 520,
  closable = true,
  mask = true,
  maskClosable = true,
  footer = true,
  okText = '确定',
  cancelText = '取消',
  onOk,
  onCancel,
  afterClose,
  confirmLoading = false,
  centered = false,
  className,
}) => {
  const [isVisible, setIsVisible] = React.useState(visible);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (visible) {
      setIsVisible(true);
      setIsAnimating(true);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    } else {
      setIsAnimating(true);
      timerRef.current = setTimeout(() => {
        setIsVisible(false);
        setIsAnimating(false);
        if (afterClose) {
          afterClose();
        }
      }, 300); // 动画持续时间
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [visible, afterClose]);

  const handleMaskClick = () => {
    if (maskClosable && onCancel) {
      onCancel();
    }
  };

  const handleOk = () => {
    if (onOk) {
      onOk();
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  // 如果不可见且不在动画中，不渲染任何内容
  if (!isVisible && !isAnimating) {
    return null;
  }

  return (
    <>
      {mask && <ModalMask $visible={visible} onClick={handleMaskClick} />}
      <ModalWrapper $visible={visible} $centered={centered} className={className}>
        <ModalContent $width={width}>
          {(title || closable) && (
            <ModalHeader>
              {title && <ModalTitle>{title}</ModalTitle>}
              {closable && <CloseButton onClick={handleCancel} />}
            </ModalHeader>
          )}
          <ModalBody>{children}</ModalBody>
          {footer !== false && (
            <ModalFooter>
              {footer === true ? (
                <>
                  <Button variant="secondary" onClick={handleCancel}>
                    {cancelText}
                  </Button>
                  <Button variant="primary" onClick={handleOk} loading={confirmLoading}>
                    {okText}
                  </Button>
                </>
              ) : (
                footer
              )}
            </ModalFooter>
          )}
        </ModalContent>
      </ModalWrapper>
    </>
  );
};

export default Modal;
