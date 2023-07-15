import { ReactNode } from "react";
import { styled } from "styled-components";

interface TitleProps {
  children: ReactNode;
}

const Title = (props: TitleProps) => {
  const { children } = props;

  return <TitleStyle>{children}</TitleStyle>;
};

export default Title;

const TitleStyle = styled.div`
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
`;
