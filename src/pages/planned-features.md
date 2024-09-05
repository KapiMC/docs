---
title: Planned Features
description: Planned Features for Kapi
hide_table_of_contents: true
---

<div style={{ width: '60%', margin: '0 auto' }}>

<div align="center">
# Planned Features
</div>

### Command creation system

- A simple way to create commands.
- Type safe arguments, such as "accept only integers" or "Player names" (should be extendable).
- Automatic handling of invalid user input
- Automatic generation of tab completions based on the type, such as an "Online Players" argument
  adding suggestions for all online players.

### Config Data Templates

Annotations that allow you to annotate and register classes as "config templates" which will then allow using them in configs, so you can define a template for things like "Settings" or "Spell".
Intended to also include annotations for constraints for example:

```java
@ConfigValue
@ConstraintInt(min = 0, max = 100)
public static int someValueLikeApercentage;
```

### Built-in Particle Templates, Components, and Systems

This aim's to provide some built-in templates like circles, squares, lines, etc that will have functionality for auto-scaling based, althoughit's very simple to create these yourself, having them built-in will ease the process and save boilerplate

</div>
