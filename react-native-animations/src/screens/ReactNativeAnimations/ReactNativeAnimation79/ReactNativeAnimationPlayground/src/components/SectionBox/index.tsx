import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleProp, ViewStyle } from 'react-native';

import { useGitHubLink } from '../../hooks/githubLink';

import { Container, SectionTitle, IconWrapper } from './styles';

interface SectionBoxProps {
  title: string;
  color: string;
  githubLink: string;
  icon: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const SectionBox: React.FC<SectionBoxProps> = ({
  title,
  color,
  githubLink,
  icon: Icon,
  style,
}) => {
  const navigation = useNavigation();
  const { setRepoLink } = useGitHubLink();

  const navigateToExample = useCallback(() => {
    navigation.navigate(title);
    setRepoLink(githubLink);
  }, [navigation, title, githubLink, setRepoLink]);

  return (
    <Container color={color} onPress={navigateToExample} style={style}>
      <IconWrapper>{Icon}</IconWrapper>
      <SectionTitle>{title}</SectionTitle>
    </Container>
  );
};

export default SectionBox;
