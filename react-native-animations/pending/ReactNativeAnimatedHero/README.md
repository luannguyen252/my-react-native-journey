### Usage

#### Props:

1. `navigationTitle` - Screen navigation title which will appear after user scroll pass hero section
2. `navigation` - Screen navigation component
3. `heroImageUrl` - Path to hero image which will be displayed initially.
4. `heroContent` - Content which will be passed to the hero section (e.g. title, subtitle, tour date)

```js
<Screen
  navigationTitle="Hello World"
  navigation={<ScreenNavigation />}
  heroContent={<HeroContent />}
  heroImageUrl={require("./cat.jpg")}
>
  ... Screen content goes here ...
</Screen>
```
