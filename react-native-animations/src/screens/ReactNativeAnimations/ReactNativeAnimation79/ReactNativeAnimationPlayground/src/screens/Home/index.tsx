import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import { useTheme } from 'styled-components';
import { useIsFocused } from '@react-navigation/native';

import SectionBox from '../../components/SectionBox';
import { useGitHubLink } from '../../hooks/githubLink';
import { sections } from '../../constants';

const Home: React.FC = () => {
  const { backgroundColor } = useTheme();
  const isFocused = useIsFocused();
  const { setRepoLink } = useGitHubLink();

  useEffect(() => {
    if (isFocused) {
      setRepoLink('https://github.com/youssef-md/reanimated-playground');
    }
  }, [isFocused, setRepoLink]);

  return (
    <FlatList
      data={sections}
      numColumns={2}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingTop: 8,
        backgroundColor,
      }}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      keyExtractor={({ title }) => title}
      renderItem={({ item: { title, color, githubLink, icon } }) => (
        <SectionBox
          title={title}
          color={color}
          githubLink={githubLink}
          icon={icon}
        />
      )}
    />
  );
};

export default Home;
