---
sidebar_position: 1
---

# ⏱Task Scheduling

- **Related classes: `Task`, `TimeUnit`**

## Build a Task

```java
Task task = Task.run(() -> {
    // Your code
});
```

## Schedule a Task for execution

```java
task.schedule();
```

**Note:** you can keep the `Task` instance, and call `Task#schedule` on it as
many times as you want, you can even modify it between calls!

## Task Modifiers

You can call methods on the `Task` instance to modify when or how many times the task will be executed.

### Delay

To run a task after 1.5 seconds

```java
int delayInTicks = 30; // 1.5 seconds
Task.run(() -> {
    // Your code
}).delay(delayInTicks).schedule();
```

Alternatively, you can specify a `TimeUnit`
```java
int delayInHours = 2; // 2 hours
Task.run(() -> {
    // Your code
}).delay(delayInHours, TimeUnit.HOUR).schedule();
```

### Interval

### Duration

### Chaining modifiers



