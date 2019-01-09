# Acyort-plugin-ghpages

publish `output` to gh-pages

## Usage

`acyort ghpage`
or

```yaml
# config.yml
ghPages:
  # gh-pages config, see
plugins:
  - other-plugin
  - acyort-plugin-ghpages
```

## Config

see [gh-pages](https://github.com/tschaub/gh-pages)

## Depoly

- `cp ./test/fixtures/config.yml.default ./test/fixtures/config.yml`
- set your `repo`
- `yarn test`
