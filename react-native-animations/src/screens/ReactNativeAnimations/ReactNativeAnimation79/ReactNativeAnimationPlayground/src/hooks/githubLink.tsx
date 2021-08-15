import React, { useState, createContext, useContext } from 'react';

interface GitHubLinkShape {
  repoLink: string;
  setRepoLink: React.Dispatch<React.SetStateAction<string>>;
}

const GitHubLinkContext = createContext<GitHubLinkShape>({} as GitHubLinkShape);

const GitHubLinkProvider: React.FC = ({ children }) => {
  const [repoLink, setRepoLink] = useState(
    'https://github.com/youssef-md/reanimated-playground',
  );

  return (
    <GitHubLinkContext.Provider value={{ repoLink, setRepoLink }}>
      {children}
    </GitHubLinkContext.Provider>
  );
};

function useGitHubLink(): GitHubLinkShape {
  const context = useContext(GitHubLinkContext);

  if (!context) {
    throw new Error(
      'useGitHubLink must be used within an <GitHubLinkProvider>',
    );
  }

  return context;
}

export { GitHubLinkProvider, useGitHubLink };
