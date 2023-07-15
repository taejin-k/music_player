import { ReactNode } from "react";
import { css, styled } from "styled-components";

interface ImageProps {
  size: number;
  children: ReactNode;
  onClick?: () => void;
}

const Image = (props: ImageProps) => {
  const { size, children, onClick } = props;

  return (
    <ImageStyled size={size} onClick={onClick}>
      {children}
    </ImageStyled>
  );
};

export default Image;

const ImageStyled = styled.div<{ size: number }>`
  ${(props) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${`${props.size}px`};
    height: ${`${props.size}px`};
    cursor: pointer;
  `}
`;
