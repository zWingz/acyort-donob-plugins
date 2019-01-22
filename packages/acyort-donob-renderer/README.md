# Acyort-donob-renderer

`process` and `render` issues for `donob` templates

require `acyort>=3.0.13`

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

repository: # optional, used in gitalk and acyort-plugin-fetch-issues

gitalk: # default false
  clientID:
  clientSecret:
  owner: # split by repository
  repo: # split by repository
  # gitalk config

favicon: # favicon.ico, copy to public/favicon.ico

plugins:
  - acyort-plugin-fetch-issues # generate data
  - acyort-donob-renderer
  - acyort-plugin-rss # optional, generate rss
```

## Development

- run `cp test/config.yml.default test/config.yml`
- set your config
- run `yarn dev`

## Related

- [gitalk](https://github.com/gitalk/gitalk)
- [acyort-plugin-rss](https://github.com/zWingz/acyort-donob-plugins/blob/master/packages/acyort-plugin-rss/README.md)
