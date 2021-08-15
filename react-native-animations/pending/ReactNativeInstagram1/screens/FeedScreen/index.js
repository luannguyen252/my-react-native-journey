import React, { Component } from 'react';
import { View, ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { PhotoCard } from '../../components';
import { FeedPhotoFragment } from '../../graphql/fragments';

class FeedScreen extends Component {
  state = {
    isRefreshing: false
  };

  refreshRequest = async () => {
    this.setState({ isRefreshing: true });
    await this.props.data.refetch();
    this.setState({ isRefreshing: false });
  };

  renderItem = ({ item }) => <PhotoCard {...item} />;

  render() {
    const { data } = this.props;

    if (data.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator color="red" size="large" />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={data.photos}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={this.renderItem}
          refreshControl={
            <RefreshControl refreshing={this.state.isRefreshing} onRefresh={this.refreshRequest} />
          }
        />
      </View>
    );
  }
}

const GET_PHOTOS_QUERY = gql`
  query GetPhotos {
    photos {
      ...FeedPhoto
    }
  }
  ${FeedPhotoFragment}
`;

export default graphql(GET_PHOTOS_QUERY)(FeedScreen);
