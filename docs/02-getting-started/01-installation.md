---
slug: /
---

# Installation

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="gradle_kts" label="Gradle (Kotlin)">

Add the dependency to your `build.gradle.kts` file.

```kts
plugins {
    id("io.github.goooler.shadow") version "8.1.8"
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("me.kyren223.kapi:[VERSION]")
}

tasks.shadowJar {
    relocate("me.kyren223.kapi", "[YOUR PACKAGE].kapi")
}
```

</TabItem>
<TabItem value="gradle_groovy" label="Gradle (Groovy)">

Add the dependency to your `build.gradle` file.

```groovy
plugins {
    id "io.github.goooler.shadow" version "8.1.8"
}

repositories {
    mavenCentral()
}

dependencies {
    implementation "me.kyren223.kapi:[VERSION]"
}

// TODO: missing shadowJar, if you use groovy with gradle
// consider contributing a code snippet to add this
```

</TabItem>
<TabItem value="maven" label="Maven">

Add the following snippets in your `pom.xml` file.

Inside the `<dependencies>` tag.

```xml
<dependency>
    <groupId>me.kyren223</groupId>
    <artifactId>kapi</artifactId>
    <version>[VERSION]</version>
</dependency>
```

Inside the `<plugins>` tag.

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-shade-plugin</artifactId>
    <version>3.6.0</version>
    <configuration>
        <relocations>
            <relocation>
                <pattern>dev.triumphteam.gui</pattern>
                <shadedPattern>[YOUR PACKAGE].kapi</shadedPattern>
            </relocation>
        </relocations>
    </configuration>
    <executions>
        <execution>
            <phase>package</phase>
            <goals>
                <goal>shade</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```

</TabItem>
</Tabs>

Replace `[VERSION]` with the Kapi version you want to use.  
Replace `[YOUR PACKAGE]` with your own package, such as `me.kyren223.myplugin`
