import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Button, Paragraph, Title} from 'react-native-paper';
import {createUseModal} from 'react-native-use-modal';

export const useSimpleModal = createUseModal(({confirm, cancel}) => {
  return (
    <View style={styles.container}>
      <Title>Title of modal</Title>
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed ex
        scelerisque, consectetur magna id, pulvinar mauris. Duis eu aliquet
        diam. Vestibulum congue est lacus, eu ullamcorper arcu eleifend a.
        Pellentesque habitant morbi tristique senectus et netus et malesuada
        fames ac turpis egestas. Pellentesque habitant morbi tristique senectus
        et netus et malesuada fames ac turpis egestas. Sed vitae nunc in nibh
        venenatis luctus.
      </Paragraph>
      <View style={styles.buttonContainer}>
        <Button onPress={confirm}>Ok</Button>
        <Button onPress={cancel}>Cancel</Button>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
});
