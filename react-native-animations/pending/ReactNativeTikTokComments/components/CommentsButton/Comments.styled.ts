import styled from "styled-components/native";

export const StyledCommentsItem = styled.View`
  flex-direction: row;
  margin-bottom: 16px;
  width: 100%;
`;

export const StyledCommentsItemEdgeContainer = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  width: 40px;
`;

export const StyledCommentsItemTextContainer = styled.View`
  margin-left: 16px;
  margin-right: 16px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex: 1;
`;

const DEFAULT_IMAGE_SIZE = 35;

export const StyledCommentsItemImage = styled.Image<{ size?: number }>`
  width: ${({ size = DEFAULT_IMAGE_SIZE }) => `${size}px`};
  height: ${({ size = DEFAULT_IMAGE_SIZE }) => `${size}px`};
  border-radius: ${({ size = DEFAULT_IMAGE_SIZE }) => `${size}px`};
  background-color: ${({ theme }) => theme.secondaryFont};
`;

export const StyledCommentsItemTextPrimary = styled.Text`
  font-size: 17px;
  line-height: 26px;
  font-weight: 400;
  color: ${({ theme }) => theme.mainFont};
`;

export const StyledCommentsItemTextSecondary = styled.Text`
  font-size: 13px;
  line-height: 24px;
  font-weight: 500;
  color: ${({ theme }) => theme.secondaryFont};
`;

export const StyledCommentsItemTextCompact = styled(
  StyledCommentsItemTextSecondary
)`
  line-height: 18px;
`;
