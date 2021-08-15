### Usage

```jsx
import React, { Component } from 'react';
import FoldView from 'react-native-foldview';

const Frontface = (props) => (/*...*/);
const Backface = (props) => (/*...*/);
const Base = (props) => (/*...*/);

export default class Row extends Component {

  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };
  }

  componentWillMount() {
    this.flip = this.flip.bind(this);
  }

  flip() {
    this.setState({
      expanded: !this.state.expanded,
    });
  }

  renderFrontface() {
    return (
      <Frontface />
    );
  }

  renderBackface() {
    /**
     * You can nest <FoldView>s here to achieve the folding effect shown in the GIF above.
     * A reference implementation can be found in examples/Simple.
     */
    return (
      <Backface />
    );
  }

  render() {
    return (
      <FoldView
        expanded={this.state.expanded}
        renderBackface={this.renderBackface}
        renderFrontface={this.renderFrontface}
      >
        <Base />
      </FoldView>
    );
  }
}

```

#### Props

| Prop                  | Type                       | Description                                                                                                                      |
| --------------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **`children`**        | `ReactElement<any>`        | React Element(s) to render.                                                                                                      |
| **`flipDuration`**    | `?number`                  | Length of flip animation in milliseconds. _Default 280._                                                                         |
| **`renderBackface`**  | `() => ReactElement<any>`  | Callback that renders a backface.                                                                                                |
| **`renderFrontface`** | `() => ReactElement<any>`  | Callback that renders a frontface.                                                                                               |
| **`renderLoading`**   | `?() => ReactElement<any>` | Callback that renders a temporary view to display before base layout occurs. If not provided, `renderFrontface` is used instead. |

#### Root-only Props

FoldViews can be nested. The following props can only be set on the root `FoldView`.

| Prop                   | Type                                          | Description                                                                                                                                                                                      |
| ---------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`collapse`**         | `?(foldviews: Array<IFoldView>) => Promise`   | Called when FoldView should collapse allowing you to have control over which FoldViews(s) to collapse. Default behavior is to wait until a FoldView is collapsed before collapsing the next one. |
| **`expand`**           | `?(foldviews: Array<IFoldView>) => Promise`   | Called when FoldView should expand allowing you to have control over which FoldView(s) to expand. Default behavior is to wait until a FoldView is expanded before expanding the next one.        |
| **`expanded`**         | `boolean`                                     | Allows you to expand and collapse the FoldView content.                                                                                                                                          |
| **`onAnimationEnd`**   | `?(duration: number, height: number) => void` | Called when a collapse animation ends.                                                                                                                                                           |
| **`onAnimationStart`** | `?(duration: number, height: number) => void` | Called before an expand animation starts.                                                                                                                                                        |
| **`perspective`**      | `?number`                                     | Defines the space within which the 3D animation occurs.                                                                                                                                          |

### Advanced Usage

You can customize the behavior of expand and collapse animations using the `expand` and `collapse` props on the root `FoldView`. For example, it's very much possible to collapse all FoldViews in a given stack altogether rather than one by one. You can do so as follows:

```jsx
const collapse = async (foldViews) => {
  /**
   * Internally, FoldView turns off rasterization when collapsed as an optimization to decrease
   * memory usage. It's important to wrap your calls in a `Promise` here to avoid early disabling
   * of rasterization.
   */
  await Promise.all(foldViews.map(foldView => foldView.collapse()));
}

<FoldView
  collapse={collapse}
  renderBackface={/* ... */}
  renderFrontface={/* ... */}
>
  { /* ... */ }
</FoldView>
```
