# Introduction

Animations should be used to improve the user experience of your application. They shouldn't be used just to delight the user as these tend to end up being pointless and actually hinder your users.

Animations can be used to reduce cognitive load, define relationships between elements, provide visual hints, and much more.

Overall animations are generally added later but provide immense value to your users and I will teach you how to breakdown animations, understand them, rebuild them, and implement them in your own applications.

# LayoutAnimation vs Animated

There have been a significant amount of animation libraries built but there are only 2 that are still actively suggested and supported.

The first one was `LayoutAnimation`. It is still experimental on Android, but fully supported on iOS. I won't be covering it primarily because of it's extreme lack of control.

`LayoutAnimation` exists purely on the native side. You declare the type of animation that should happen and whenever a `setState` happens next your animation will run.

This sounds ideal but there is no control over scoping these animations to specific views, or children. That means if you don't want to animate certain elements and they are created/updated on the next `setState` they will animate.

It animates by comparing the previous layout, to the next layout and then applying the animation. This may be ideal and easy to setup in some cases, but as your application complexity grows you may run into issues.

This is where `Animated` shines. It doesn't fully run in the native world yet, but it is actively being worked on. It allows you to control and animate specific views. It doesn't use `setState` so you are in control of when animations start/stop.

There are downsides to both `LayoutAnimation` and `Animated`. The main down side is the complete lack of unmounting animations. With special wrapper components these animations can be crafted but this is less than ideal.

Unmounting animations are still a relatively unsolved problem on both the web and mobile when it comes to React. Ultimately `Animated` has the most development focus right now, as well as the most flexibility in crafting animations. This is why we'll heavily focus on understanding the `Animated` library.
