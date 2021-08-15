// @flow
import { Animated, Easing } from "react-native";

const AnimatedWithChildren = Animated.Value.prototype.constructor;

/**
  path 作为 AnimateValue 的注意事项:
  __getValue 方法返回值等于 _value + _offset 其中 _offset 为 0 会导致 pathd 解析陷入死循环
  需要将 _offset 设为 ""
**/

// 作为调用链上的一环
// 处于 AnimatedProps 与 AnimatedValue 中间 类似于 AnimatedStyle
export default class AnimatedPath<T> extends AnimatedWithChildren {
  _parent: AnimatedWithChildren;
  _f: number => T;

  constructor(_parent: AnimatedWithChildren, _f: number => T) {
    super();
    this._parent = _parent;
    this._f = _f;
  }

  __makeNative(): void {
    this._parent.__makeNative();
    super.__makeNative();
  }

  __attach(): void {
    // 建立自顶向下调用关系
    this._parent.__addChild(this);
  }

  __detach(): void {
    this._parent.__removeChild(this);
    super.__detach();
  }

  __getValue(): T {
    // 输出值
    const value = this._parent.__getValue();
    return this._f.call(this, value);
  }
}
