import { ReactNode } from "react";
import { css, styled } from "styled-components";

interface TextProps {
  width?: number;
  center?: string;
  children: ReactNode;
}

const Text = (props: TextProps) => {
  const { width = 0, center = "left", children } = props;

  return (
    <TextStyled width={width} $center={center}>
      {children}
    </TextStyled>
  );
};

export default Text;

const TextStyled = styled.span<{ width: number; $center: string }>`
  ${(props) => css`
    width: ${props.width ? `${props.width}px` : "auto"};
    font-size: 16px;
    font-weight: bold;
    text-align: ${props.$center};
  `}
`;
