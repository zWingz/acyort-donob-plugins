# Acyort-donob-renderer

`process` and `render` issues for `donob` templates


## Usage

```yaml
# config.yml

title: ''

template: acyort-templates-donob-plus

tagsDir: # default tags
postsDir: # default posts
archivesDir: # default archives

plugins:
  - acyort-plugin-fetch
  - acyort-donob-renderer

```

## Development

- run `cp test/config.yml.default test/config.yml`
- set your config
- run `yarn dev`
