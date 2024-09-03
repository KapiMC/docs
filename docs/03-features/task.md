# Task Scheduling

- **Related classes: `TaskBuilder`, `TimeUnit`, `KapiTask`**

## Build and run a task

```java
TaskBuilder.create(() -> {
    // Your code
}).schedule();
```

This will execute your code on the next server tick (1 tick = 0.05s).

:::tip

you can keep the `TaskBuilder` instance, and call `schedule()` on it as
many times as you want. You can even modify it in-between calls!

:::

## Task Modifiers

You can call methods on the `TaskBuilder` instance to modify when or how many times the task will be executed.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="delay" label="Delay">

To run a task after some delay:

```java
int delayInTicks = 30; // 1.5 seconds
TaskBuilder.create(() -> {
    // This will run once after 1.5 seconds
}).delay(delayInTicks).schedule();
```

Alternatively, you can specify a `TimeUnit`:

```java
int delayInHours = 2; // 2 hours
TaskBuilder.create(() -> {
    // This will run once after 2 hours
}).delay(delayInHours, TimeUnit.HOURS).schedule();
```

</TabItem>
<TabItem value="interval" label="Interval">

To run a task repeatedly every some amount of time:

```java
int intervalInTicks = 50; // 2.5 seconds
TaskBuilder.create(() -> {
    // This will run forever, every 2.5 seconds
}).interval(intervalInTicks).schedule();
```

Alternatively, you can specify a `TimeUnit`:

```java
int intervalInMinecraftDays = 1; // a Minecraft day is 20 minutes
TaskBuilder.create(() -> {
    // This will run forever, once per Minecraft day
}).interval(intervalInMinecraftDays, TimeUnit.MINECRAFT_DAYS).schedule();
```

</TabItem>
<TabItem value="delay_interval" label="Delay and Interval">

You can even _chain_ a delay with an interval as such:

```java
int delay = 20; // 20 seconds
int interval = 3; // 3 hours
TaskBuilder.create(() -> {
    // After 20 seconds, this will run forever, every 3 hours
}).delay(delay, TimeUnit.SECONDS).interval(interval, TimeUnit.HOURS).schedule();
```

</TabItem>
<TabItem value="async" label="Async">

Async allows you to run tasks on a separate thread to avoid blocking the main thread

```java
TaskBuilder.create(() -> {
    // Your code to run asynchrounously
}).async().schedule()
```

:::warning[Calling Bukkit or Spigot functions]

You should not call any Minecraft-related methods from async code.

:::

</TabItem>
</Tabs>

### Stopping Conditions

So far, we've seen `interval` tasks run forever.
However, you may add one or more **stopping conditions** to stop a task's execution.

<Tabs>
<TabItem value="repeat" label="Repeat">

You can specify **how many times** you want a task to repeat:

```java
TaskBuilder.create(() -> {
    // Will run every 5 seconds, for 20 times, and then stop
}).interval(5, TimeUnit.SECONDS).repeat(20).schedule();
```

</TabItem>
<TabItem value="duration" label="Duration">

You can specify **how long** you want a task to last (excluding `delay()`):

```java
int delayInTicks = 216000; // 3 hours
int intervalInTicks = 2; // 10 times per second
int durationInTicks = 60; // 3 seconds
TaskBuilder.create(() -> {
    // After 3 hours, will run every 2 ticks, until 60 ticks have passed
    // In this case, it will be executed 30 times (60 / 2)
}).interval(intervalInTicks).duration(durationInTicks).delay(delayInTicks).schedule();
```

Alternatively you may also use `duration(3, TimeUnit.SECONDS)` to achieve the same thing.

</TabItem>
<TabItem value="condition" label="While Condition">

For ultimate control, **write your own function** to control when a task should stop:

```java
BooleanSupplier myCondition = () -> {
    return Math.random() < 0.9 ? true : false;
};
TaskBuilder.create(() -> {
    // Will run every tick, until myCondition returns false (10% chance to stop)
}).whileCondition(myCondition).schedule();
```

</TabItem>
</Tabs>

:::warning

Calling `schedule()` on a task **with a stopping condition** and **without an interval**
will automatically set the interval to 1 tick (will run 20 times per seconds)

:::

:::info

You may use multiple stopping conditions together.  
The task will stop whenever the first stopping condition is reached.

:::

# Task Completion Callback

To run some code when a task finishes, you can do:

```java
TaskBuilder.create(() -> {
    System.out.println("Task Started");
}).onFinish(() -> {
    System.out.println("Task Finished");
}).schedule();
```

This may be very useful, especially when having multiple stop conditions.

## Task State Management

The `KapiTask` interface holds useful information such as:
- **Task ID** - the ID is needed to identify the task in certain Spigot methods.
- **Owner** - the plugin that scheduled the task.
- **Sync** - Wether the task is synchronous or asynchronous.
- **Cancelled** - Wether the task has been cancelled already.
- **Delay** - the initial delay the task was created with.
- **Interval** - the initial interval the task was created with.
- **Times Ran** - the amount of times the task has run.
- **Duration** - the duration (in ticks, excluding delay) the task has been running for.

### Manually cancelling a Task

It can also be used to cancel a task manually:

```java
TaskBuilder.create((task) -> {
    boolean someLogic = true;
    if (someLogic && task.getTimesRan() > 2) {
        task.cancel();
    }
}).interval(20, TimeUnit.SECONDS).schedule();
```

### Methods that optionally accept a `KapiTask`

- `create(task -> { /* task code */ })`
- `whileCondition(task -> { /* condition */ })`
- `onFinish(task -> { /* on finish code */ })`
- `schedule(task -> { /* task code */ })`

