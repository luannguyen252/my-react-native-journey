## Usage example

```javascript
import Gallery from 'react-native-image-gallery';

  render() {
    return (
      <Gallery
        style={{ flex: 1, backgroundColor: 'black' }}
        images={[
          { source: require('yourApp/image.png'), dimensions: { width: 150, height: 150 } },
          { source: { uri: 'http://i.imgur.com/XP2BE7q.jpg' } },
          { source: { uri: 'http://i.imgur.com/5nltiUd.jpg' } },
          { source: { uri: 'http://i.imgur.com/6vOahbP.jpg' } },
          { source: { uri: 'http://i.imgur.com/kj5VXtG.jpg' } }
        ]}
      />
    );
  }
```

## Remote and local images

This component supports both remote images by specifying `source.uri`, and local images where `source` is the result of `require()`.

**Be aware that the width and height must be defined for local images, but is not required for remote images!** Although the dimensions could still be provided for remote images to save the gallery from fetching them, which could potentially improve performance.

## Props

| Prop                       | Description                                                                                           | Type       | Default                          |
| -------------------------- | ----------------------------------------------------------------------------------------------------- | ---------- | -------------------------------- |
| `images`                   | Your array of images                                                                                  | `array`    | Required                         |
| `initialPage`              | Image displayed first                                                                                 | `number`   | `0`                              |
| `imageComponent`           | Custom function to render your images, 1st param is the image props, 2nd is its dimensions            | `function` | `<Image>` component              |
| `errorComponent`           | Custom function to render the page of an image that couldn't be displayed                             | `function` | A `<View>` with a stylized error |
| `flatListProps`            | Props to be passed to the underlying `FlatList`                                                       | `object`   | `{windowSize: 3}`                |
| `pageMargin`               | Blank space to show between images                                                                    | `number`   | `0`                              |
| `onPageSelected`           | Fired with the index of page that has been selected                                                   | `function` |
| `onPageScrollStateChanged` | Called when page scrolling state has changed, see [scroll state and events](#scroll-state-and-events) | `function` |
| `onPageScroll`             | Scroll event, see [scroll state and events](#scroll-state-and-events)                                 | `function` |
| `scrollViewStyle`          | Custom style for the `FlatList` component                                                             | `object`   | `{}`                             |
| `onSingleTapConfirmed`     | Fired after a single tap                                                                              | `function` |
| `onLongPress`              | Fired after a long press                                                                              | `function` |

## Scroll state and events

- `onPageScroll` : (event) => {}.

  The event object carries following data:

  - `position`: index of first page from the left that is currently visible.
  - `offset`: value from range [0,1) describing stage between page transitions.
  - `fraction`: means that (1 - x) fraction of the page at "position" index is visible, and x fraction of the next page is visible.

- `onPageScrollStateChanged` : (state) => {}.

  Called when the page scrolling state has changed. The page scrolling state can be in 3 states:

  - `'idle'`: there is no interaction with the page scroller happening at the time.
  - `'dragging'`: there is currently an interaction with the page scroller.
  - `'settling'`: there was an interaction with the page scroller, and the page scroller is now finishing its closing or opening animation.
