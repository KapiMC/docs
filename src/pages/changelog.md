---
title: Changelog
description: Kapi Versions Changelog
hide_table_of_contents: true
---

<div style={{ width: '60%', margin: '0 auto' }}>

# Changelog

All notable changes to this project will be documented on this page.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2024-09-19

### Added

- More number parsers in `Utils` class, for types such as short/int/long/float/double.
- `Log.Level.KAPI`, for internal logging inside of Kapi.
  This should help with testing and debugging Kapi, while not cluttering the `DEBUG` level.
- Command System:
  - `Command` class that can be extended to create a command.
  - `@SubCommand` annotation to mark methods inside a class that extends `Command`.
  - `KapiPlugin#registerCommand(String, Command)` to register a `Command` subclass.
  - `ArgumentParser<T>` to allow for parsing a generic type inside a subcommand method.
  - `ArgumentRegistry` to manage argument parsers and what classes they apply to.
  - Argument parsers can be implemented by users and registered in the registry,
    this allows users to create their own parsers for their own custom types.
  - Built-in argument parsers for primitives, any enums, arrays, `List<T>`, `Option<T>`, `Location` and `Player`.
  - Automatic reporting of possible subcommands to the user if no subcommands match.
- `SqliteDB` to manage file-based Sqlite databases and `QueryBuilder` to ease the process of creating `SqlQuery`.

### Deprecated

- `Utils#col24(String)` should be replaced with `Utils#col(String)` which supports 24-bit "true color".
  See [this website](https://www.birdflop.com/resources/rgb) for how to format it.

## [0.1.0] - 2024-09-07

### Added

- Initial public release

</div>
