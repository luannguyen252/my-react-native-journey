import * as React from "react";
import { Paragraph, Dialog, Portal } from "react-native-paper";

const DialogTitleExample = () => {
  const [visible, setVisible] = React.useState(false);

  const hideDialog = () => setVisible(false);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>This is a title</Dialog.Title>
        <Dialog.Content>
          <Paragraph>This is simple dialog</Paragraph>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

export default DialogTitleExample;
