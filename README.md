# React Native

## Installation

```bash
# Install CLI
npm install --global expo-cli
# Create a new project
expo init ReactNativeExpoApp
# Go to project
cd ReactNativeExpoApp
# Start project
expo start
# Login Expo account (optional)
expo login
# Create a new project with TypeScript (optional)
expo init -t expo-template-blank-typescript
# Reset cache
expo r -c
```

**React Native Shadow**

```javascript
shadowColor: "#000000",
shadowOffset: {
	width: 0,
	height: 4,
},
shadowOpacity: 0.08,
shadowRadius: 12,
elevation: 5,
```

**React Native Data**

```javascript
const data = [
  {
    name: "Luan Nguyen",
    age: 30,
  },
  {
    name: "Steve Jobs",
    age: 40,
  },
];

export default function App() {
  return (
    <View>
      <View>
        {data.map((item, index) => (
          <Text key={index}>
            {item.name}, {item.age}
          </Text>
        ))}
      </View>
    </View>
  );
}
```
