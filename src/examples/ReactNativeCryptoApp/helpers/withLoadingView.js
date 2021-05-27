import React from 'react';
import { View, ActivityIndicator, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { styled } from 'react-native-base-components';

const Container = styled(View, ({ theme }) => ({
  zIndex: -1,
  position: 'absolute',
  width: Dimensions.get('screen').width,
  height: Dimensions.get('screen').height,
  backgroundColor: theme.colors.background,
  justifyContent: 'center',
}));

const withLoadingView = (Component, { label }) => {
  const WrappedComponent = props => {
    const { loading, forwardRef, ...restProps } = props;
    if (loading) {
      return (
        <Container>
          <ActivityIndicator />
        </Container>
      );
    }
    return <Component {...restProps} ref={forwardRef} />;
  }

  const mapProps = state => ({
    loading: state.ui.pendingRequests[label] > 0,
  });
  const ConnectedComponent = connect(mapProps)(WrappedComponent);
  return React.forwardRef((props, ref) => {
    return <ConnectedComponent {...props} forwardRef={ref} />;
  });
}

export default withLoadingView;