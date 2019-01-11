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
pageSize:
  archives: # default 10
  posts: # default 10

repository: # optional, used in gitalk and acyort-plugin-fetch

gitalk: # default false
  clientID:
  clientSecret:
  owner: # split by repository
  repo: # split by repository
  # gitalk config

plugins:
  - acyort-plugin-fetch
  - acyort-donob-renderer

```

## Development

- run `cp test/config.yml.default test/config.yml`
- set your config
- run `yarn dev`


## Related

- [gitalk](https://github.com/gitalk/gitalk)
