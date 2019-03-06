# acyort-plugin-fetch-issues

fetch `issues` from `github`

require `acyort>=3.0.13`

## Usage

```yaml
# config.yml

repository: # your repo
author: # issues creator, default repo owner
gitToken:  # set github token if repo is private
issuesPageSize: # issues per_page, default: 20
issuesCache: # cache issues
plugins:
  - acyort-plugin-fetch-issues

```
