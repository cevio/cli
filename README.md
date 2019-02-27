# @node/cli

插件式命令行工具

## Usage

```shell
cpm i @node/cli -g
```

## Install Plugins

```shell
cli install <plugins...> [-r <registry>]
```

## Uninstall Plugins

```shell
cli uninstall <plugins...>
```

## Update Plugins

```shell
cli update [plugins...] [-r <registry>]
```

## View Plugins


```shell
cli view [plugins...]
```

## Make a plugin template

```shell
cli make [plugin]
```

## Link plugin

```shell
cli link
```

## unlink plugin

```shell
cli unlink
```

## Build Plugin

每个插件都返回一个函数即可

```javascript
module.exports = (program, client) => {
  program.command(...).option(...).action(client.require('./lib/xxx'));
}
module.exports.__IS_CLI_PLUGIN__ = true;
```