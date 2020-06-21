# Dyanmic DNS for GoDaddy Domain Names

Use a GoDaddy domain name for remote access without needing a static IP address

## Installation

```
npm i -g dnsdaddy
```

## Usage

First setup your GoDaddy credentials and domain with:

```
dnsdaddy init
```

To update your IP address:

```
dnsdaddy update
```

Setup as a 20 minute cron:
```
(crontab -l;echo "*/20 * * * * /usr/bin/dnsdaddy update)|crontab -
```

