import React from 'react';

import { useGitHubLink } from '../../hooks/githubLink';

import { Container } from './styles';

const WebView: React.FC = () => {
  const { repoLink } = useGitHubLink();

  return <Container source={{ uri: repoLink }} />;
};

export default WebView;
