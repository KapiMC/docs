# Null Safety

- **Related classes: `Option<T>`, `Result<T>`, `UnsafeUnwrapException`**
- **Related annotations: `@NonNull`, `@Nullable`, `@NullMarked`, `@NullUnmarked`**

## The problem

It's not clear when a given variable may be null or not based on it's type.
This either forces you to assume every variable is null, and add a null check, or,
more commonly, forget to check for null, and get a nasty `NullPointerException` at runtime,
and now you need to debug where in your entire code it arrived from.

## The solution (kinda)

What if, along with the type of the variable, **we specify if it can potentially be null**.
Kapi bundles the [Jspecify](https://jspecify.dev/) library, which allows you to annotate your types:

- `@NonNull String` - a string that cannot be null.
- `@Nullable String` - a string that may or may not be null.

The entirety of Kapi uses these annotations to clearly indicate when you absolutely
need a null check, and when you don't need a null check.

:::tip
You can use Jspecify to annotate your own code too!  
To get started, check out [Jspecify's User Guide](https://jspecify.dev/docs/user-guide/).
:::

## A Better Solution

Sure, annotations can help, but they are just a hint that static analysis tools can use to warn you.  
We need a solution that stops you from accidentally forgetting a null check
and getting a `NullPointerException` at runtime.

:::info
You might've encountered the `Option<T>` and `Result<T, E>` classes.  
They are usually returned by Kapi's methods.
:::

### Option

Inspired by Rust's Option and Java's Optional, Kapi provides an `Option<T>` type.

An option, can be in one of 2 states:

- Some(value) - contains a value, that cannot be `null`.
- None - doesn't contain a value, (similar to a `null` value).

To get the value inside, you must explicitly handle both cases:

```java
Option<Integer> opt = ...;
opt.match(value -> {
    // We can now use the value safely
}, () -> {
    // There is no value, handle the error appropriately
});
```

This now prevents you from accidentally forgetting a check,
but it's still pretty tedious to work with.

The `Option` type has a bunch of methods to make working with it nicer, here are some notable ones:

- `map(value -> { /* code */ })` - maps an option of a given type to a different type.
- `unwrapOr(defaultValue)` - returns the value if it exists, or the provided default value if it doesn't exist.
- `inspect(value -> { /* code */})` - runs the code if the value exists or does nothing if it doesn't exist.
- `expect(message)` - returns the value if it exists, or throws a `UnsafeUnwrapException` with the given message

### Result

Kapi provides a `Result<T,E>` type (inspired by Rust).

Similar to an option a result can be in one of 2 states:

- `Ok(value)` - the "desired" value.
- `Err(value)` - a value indicating an error.

Like Option, you can match on a result to handle both cases:

```java
Result<String, Exception> result = ...;
result.match(ok -> {
    // Can use the ok value as needed
}, err -> {
    // Can handle the error value, such as logging it.
});
```

Most of `Option`'s methods also exist in result, but here are some result-specific ones:
- `ok()` - convert the result to an option, discarding the error.
- `inspectErr(err -> { /* code */ })` - similar to `inspect` but used on the error value

