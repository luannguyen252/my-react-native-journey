# AsyncStorage Methods

## Methods

**setItem()**

```javascript
static setItem(key: string, value: string, [callback]: ?(error: ?Error)=>void)
```

> The `setItem()` sets the value for a `key` and invokes a callback upon compilation. It returns a Promise object.

**getItem()**

```javascript
static getItem(key: string, [callback]: ?(error: ?Error, result: ?string)) =>void)
```

> The `getItem()` fetches an item from a `key` and invokes a callback upon completion. It returns a Promise object.

**removeItem()**

```javascript
static removeItem(key: string, [callback]: ?(error: ?Error) => void)
```

> The `removeItem()` removes an item for a `key` and invokes a callback upon compilation. It returns a Promise object.

**mergeItem()**

```javascript
static mergeItem(key: string, value: string, [callback]: ?(error: ?Error) => void)
```

> The `mergeItem()` merges the existing key's value with the input value and assuming both values are stringified JSON. It returns a Promise object.

**clear()**

```javascript
static clear([callback]: ?(error: ?Error) => void)
```

> The `clear()` method erases all AsynchStorage from all clients, libraries, etc. It is suggested that don't call this, instead of this you may use `removeItem` or `multiRemove` to clear only your app's keys. It returns the Promise object.

**getAllKeys()**

```javascript
static getAllKeys([callback]: ?(error: ?Error, keys: ?Array<string>) => void)
```

> It gets all the keys which are known to your app, for all callers, libraries, etc. It returns a Promise object.

**flushGetRequests()**

```javascript
static flushGetRequests(): [object Object]
```

> It flushes any pending request using a single batch call to get the data.

**multiGet()**

```javascript
static multiGet(keys: Array<string>, [callback]: ?(errors: ?Array<Error>, result: ?Array<Array<string>>) => void)
```

> This method allows you to batch fetching of items given in an array of key inputs. The callback method will be invoked with an array of corresponding key-value pairs found:

```javascript
multiGet(['k1', 'k2'], cb) -> cb([['k1', 'val1'], ['k2', 'val2']])
```

The method returns a Promise object.

**multiSet()**

```javascript
static multiSet(keyValuePairs: Array<Array<string>>, [callback]: ?(errors: ?Array<Error>) => void)
```

This method is used as a batch operation to store multiple key-value pairs. After the completion of operations, you will get a single callback with any errors:

```javascript
multiSet(
  [
    ["k1", "val1"],
    ["k2", "val2"],
  ],
  cb
);
```

The method returns a Promise object.

**multiRemove()**

```javascript
static multiRemove(keys: Array<string>, [callback]: ?(errors: ?Array<Error>) => void)
```

> This method calls the batch deletion of all keys in the key array. It returns a Promise object.

**multiMerge()**

```javascript
static multiMerge(keyValuePairs: Array<Array<string>>, [callback]: ?(errors: ?Array<Error>) => void)
```

It executes the batch of operation to merge existing and new values for a given set of keys. It assumes that the values are stringified JSON. It returns a Promise object.
