# File-based SQL Database

- **Related: `SqliteDB`, `SqlQuery`, `QueryBuilder`**

Usually in Minecraft, it's common to use YAML config files to store
data persistently between restarts, and while it works,
in some cases it may not be enough for the kind of data-lookup you need.

Relational Databases solve this issue by providing a language named `SQL` (structured query language)
to organize data better, and to be able to write more complex lookups.

If you are not familiar with it, I recommend checking [this tutorial](https://www.w3schools.com/sql/)

## Sqlite

Kapi chose to integrate Sqlite into Kapi due to a few reasons:

- File-based - 1 database per file, can be stored in the plugin's datafolder.
- Simple to use - no need complex setups or configuration, just standard `SQL`.
- Fast and efficient for most use cases a Minecraft plugin would need.

## Creating a database

```java
SqliteDB db = SqliteDB.create("my_sqlite.db");
```

## Interacting with the database

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="update" label="Update">

```java
SqliteDB db = ...;
Result<Integer, SQLException> result = db.executeUpdate("INSERT INTO players (name) VALUES(?);", "Steve");
result.match(rowsChanged -> {
    Log.info("Changed " + rowsChanged + " rows");
}, e -> {
    e.printStackTrace();
});
```

### How it works

- It inserts into the "players" table a new player with the name "Steve"
- If there was an error, we print it
- Otherwise we log how many rows were changed by this operation (should be 1)

</TabItem>
<TabItem value="query" label="Query">

```java
SqliteDB db = ...;
Result<ResultSet, SQLException> result = db.executeQuery("SELECT * FROM players;");
result.match(rs -> {
    try (rs) {
        while (rs.next()) {
            Log.info("Player Name: " + rs.getString("name"));
        }
    }
}, e -> {
    e.printStackTrace();
});
```

### How it works

- It Selects all the players with the name "Steve"
- If there was an error, we print it
- Otherwise we try-with-resource on the `ResultSet`
- We loop through all the rows in the result set
- At each row, we print the name of the player

</TabItem>
</Tabs>

:::info
`executeUpdate` - operations that change the database (`INSERT`, `UPDATE`, `DELETE`)
`executeQuery` - operations that read the database but don't change it (`SELECT`)
:::

## Query Builder

Typing "raw" SQL queries can be a pain,
using a query builder can help with avoiding typos and makes SQL injections less likely.

### Executing a query

Calling `build()` on a query builder returns an instance of `SqlQuery` which
can then be passed directly to the database `executeUpdate` or `executeQuery` methods.

```java
SqliteDB db = ...;
SqlQuery query = QueryBuilder.insertInto("players")
    .columns("name")
    .values("Steve")
    .build();
db.executeUpdate(query);
```

### Examples

All examples return a `SqlQuery`

```java
QueryBuilder.createTable("players")
    .column("name", "TEXT")
    .column("uuid", "TEXT")
    .column("level", "INTEGER", "0")
    .build();
```

```java
QueryBuilder.dropTable("players");
```

```java
QueryBuilder.select("*").from("players")
    .where("name = ?", "Steve")
    .build()
```
