# Task Scheduling Example

Let's say we want to run some code snippet, 1 hour from now, every 5 minutes, for 20 times and then stop.

## Spigot

With spigot, you'd probably write something similar to this

```java
final int[] taskId = {0};
AtomicInteger counter = new AtomicInteger();
taskId[0] = Bukkit.getScheduler().runTaskTimer(MyPlugin.getProvidingPlugin(MyPlugin.class), () -> {
    if (counter.get() >= 20) {
        Bukkit.getScheduler().cancelTask(taskId[0]);
        return;
    }
    // My code
    counter.getAndIncrement();
}, 20 * 60 * 60, 5 * 20 * 60).getTaskId();
```

- We keep track of the `taskId` and a `counter` of how many times we have executed already
- We schedule a repeating task that will run in 1 hour (20 _ 60 _ 60), and run every 5 minutes (5 _ 20 _ 60)
- If the counter reaches 20, we cancel the task
- We execute our code
- We increment the counter by 1

This is quite a bit of boilerplate to run a code snippet, can we do better? yes!

# Kapi

Here's the exact same functionality with Kapi

```java
Task.run(() -> {
    // My code
}).delay(1, TimeUnit.HOURS).interval(5, TimeUnit.MINUTES).repeat(20).schedule();
```

This is way less typing, and it's much more clear what the code is supposed to do.

- Run this code snippet
- With a delay of 1 hour
- With an intervla of 5 minutes
- And repeat it 20 times
- Schedule the `Task` for execution
