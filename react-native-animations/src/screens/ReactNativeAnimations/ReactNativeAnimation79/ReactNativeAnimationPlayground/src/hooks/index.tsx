import React from 'react';

import { GitHubLinkProvider } from './githubLink';

const AppProvider: React.FC = ({ children }) => {
  return <GitHubLinkProvider>{children}</GitHubLinkProvider>;
};

export default AppProvider;
