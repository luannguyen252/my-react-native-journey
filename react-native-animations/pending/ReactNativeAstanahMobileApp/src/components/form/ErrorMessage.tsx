import React from "react";

import { Text } from "../Theme";

interface ErrorMessageProps {
  error: string;
  visible: boolean;
}

const ErrorMessage = ({ error, visible }: ErrorMessageProps) => {
  if (!visible || !error) return null;

  return (
    <Text variant="b3B" color="red" marginBottom="s">
      {error}
    </Text>
  );
};

export default ErrorMessage;
