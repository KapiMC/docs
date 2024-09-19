# Literal Arguments

- **Related: `@Literal`, `@SubCommand`, `Command`**

Literals are a way to gurantee a user has typed something, for example:

- `/kapi add <number>`
- `/kapi remove <number>`

In the example above, "add" and "remove" are literals

### Example

```java
public class KapiCommand extends Command {

    @SubCommand
    public void add(CommandSender sender, @Literal("add") String add, int number) {
        // Command logic
    }

    @SubCommand
    public void remove(CommandSender sender, @Literal("remove") String add, int number) {
        // Command logic
    }
}
```

By default a literal is case insensitive and has no aliases.
You may tweak the `@Literal` annotation to make it case sensitive,
or add additional aliases.
