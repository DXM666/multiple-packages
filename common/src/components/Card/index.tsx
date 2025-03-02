import React from 'react';
import styled from 'styled-components';

export interface CardProps {
  /**
   * 卡片标题
   */
  title?: React.ReactNode;
  /**
   * 卡片副标题
   */
  subtitle?: React.ReactNode;
  /**
   * 卡片内容
   */
  children: React.ReactNode;
  /**
   * 卡片底部内容
   */
  footer?: React.ReactNode;
  /**
   * 卡片宽度
   */
  width?: string | number;
  /**
   * 是否有阴影
   */
  shadow?: boolean;
  /**
   * 卡片边框
   */
  border?: boolean;
  /**
   * 额外的CSS类名
   */
  className?: string;
}

const StyledCard = styled.div<{ $width?: string | number; $shadow?: boolean; $border?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border-radius: 0.25rem;
  width: ${({ $width }) => ($width ? (typeof $width === 'number' ? `${$width}px` : $width) : '100%')};
  
  ${({ $border }) => $border && `
    border: 1px solid rgba(0, 0, 0, 0.125);
  `}
  
  ${({ $shadow }) => $shadow && `
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  `}
`;

const CardHeader = styled.div`
  padding: 0.75rem 1.25rem;
  margin-bottom: 0;
  background-color: rgba(0, 0, 0, 0.03);
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  
  &:first-child {
    border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0;
  }
`;

const CardTitle = styled.h5`
  margin-bottom: 0.25rem;
  font-size: 1.25rem;
  font-weight: 500;
`;

const CardSubtitle = styled.h6`
  margin-top: -0.375rem;
  margin-bottom: 0;
  font-size: 0.875rem;
  color: #6c757d;
`;

const CardBody = styled.div`
  flex: 1 1 auto;
  padding: 1.25rem;
`;

const CardFooter = styled.div`
  padding: 0.75rem 1.25rem;
  background-color: rgba(0, 0, 0, 0.03);
  border-top: 1px solid rgba(0, 0, 0, 0.125);
  
  &:last-child {
    border-radius: 0 0 calc(0.25rem - 1px) calc(0.25rem - 1px);
  }
`;

/**
 * 卡片组件，用于内容展示
 */
export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  footer,
  width,
  shadow = true,
  border = true,
  className,
}) => {
  return (
    <StyledCard $width={width} $shadow={shadow} $border={border} className={className}>
      {(title || subtitle) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
        </CardHeader>
      )}
      <CardBody>{children}</CardBody>
      {footer && <CardFooter>{footer}</CardFooter>}
    </StyledCard>
  );
};

export default Card;
