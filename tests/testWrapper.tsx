import { MobxProvider } from "../src/models/connect";
import { rootModel } from "../src/models/RootModel";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import React from "react";

interface TestWrapperProps {
  children: JSX.Element;
}
export const TestWrapper = (props: TestWrapperProps): JSX.Element => {
  const ErrorFallback = (props: FallbackProps): JSX.Element => {
    const { error, resetErrorBoundary } = props;
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    );
  };
  return (
    <MobxProvider value={rootModel}>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          // reset the state of your app so the error doesn't happen again
        }}
      >
        {props.children}
      </ErrorBoundary>
    </MobxProvider>
  );
};
