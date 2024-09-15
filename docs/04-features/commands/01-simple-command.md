# Simple Command

- **Related: `Command`, `KapiPlugin`, `@SubCommand`**

For this example, we will be recreating a simple version of the `/give` command.
Players will be able to use `/mygive <material> <amount>`.

## Extending `Command`

Create a new class that extends `Command` like so:

```java
import io.github.kapimc.kapi.commands.Command;

public class MyGiveCommand extends Command {

}
```

:::tip
Make sure you are using the `Command` class from Kapi and not the one from Bukkit/Spigot
:::

## Registering the Command

Before we forget, let's register it now.  
You'll also need to register it in the `plugin.yml` file like any other command.

Add the `registerCommand()` method to `onPluginLoad()` inside your main plugin class

```java
public class YourMainPluginClass extends KapiPlugin {
    @Override
    public void onPluginLoad() {
        registerCommand("mygive", new MyGiveCommand());
    }
}
```

## Adding a SubCommand

Let's make our command finally do something.

```java
public class MyGiveCommand extends Command {
    @SubCommand
    public void give(CommandSender sender, Material item, int amount) {
        if (sender instanceof Player player) {
            ItemStack itemStack = new ItemStack(item, amount);
            player.getInventory().addItem(itemStack);
        } else {
            String error = "Only players can use this command!";
            // Equivalent to sender.sendMessage(ChatColor.RED + error);
            Log.error(error, sender);
        }
    }
}
```

That's it, compile your plugin and go test it!

For a method to be considered valid, it must:

- Be annotated with `@SubCommand`
- Be public but not static
- Return void
- Have `CommandSender` or any subclass of it as the first parameter

Our example works, but here's another way of achieving it,
instead of checking if sender is a player, we can directly use `Player`.

```java
public class MyGiveCommand extends Command {
    @SubCommand
    public void give(Player player, Material item, int amount) {
        ItemStack itemStack = new ItemStack(item, amount);
        player.getInventory().addItem(itemStack);
    }
}
```

The only disadvantage with this approach is that you won't be able to provide your own
custom error message, so choose which one you prefer.

## All built-in types

You can only use certain types as parameters to `@SubCommand` methods,
here's a list of all the built-in types.

:::tip
You can register your own types, see **[Making your own argument parser](./05-argument-parser.md)**.
:::

### Primitives

- `String`
- `boolean` / `Boolean`
- `short` / `Short`
- `int` / `Integer`
- `long` / `Long`
- `float` / `Float`
- `double` / `Double`
- Any enum

### Collections

- Arrays of any type
- `List<T>`

### Kapi

- `Option` - for optional arguments

### Minecraft

- `Material`
- `Location`
- `Player`
