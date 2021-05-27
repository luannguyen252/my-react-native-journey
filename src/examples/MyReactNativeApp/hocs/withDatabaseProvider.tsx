import React from "react";
import DatabaseProvider from "@nozbe/watermelondb/DatabaseProvider";
import { getDatabase } from "../services";

export function withDatabaseProvider<T>(
  WrappedComponent: React.ComponentType<T>
) {
  const database = getDatabase();
  return (props: T) => (
    <DatabaseProvider database={database}>
      <WrappedComponent {...props} />
    </DatabaseProvider>
  );
}
