[![test](https://github.com/alobzov/asciidoc-link-check/actions/workflows/test.yml/badge.svg)](https://github.com/alobzov/blog/actions/workflows/test.yml)
[![Hits-of-Code](https://hitsofcode.com/github/alobzov/asciidoc-link-check?branch=main&label=Hits-of-Code)](https://hitsofcode.com/github/alobzov/asciidoc-link-check/view?branch=main&label=Hits-of-Code)
[![My Telegram](https://img.shields.io/badge/Telegram-contact-active?logo=telegram)](https://t.me/alobzov)

# Asciidoc Link Check

This module extracts links from asciidoc texts and checks whether each link is alive ( 200 OK ) or dead.

## Test

To test the module simply run

```shell
yarn test
```

## Valid Links Example

Run

```shell
yarn asciidoc-link-check ./test/data/valid-links-file.adoc
```

The exit code would be `0` and every link found is alive ( 200 OK ).

```shell
7:27   200 OK   http://docs.asciidoctor.org/asciidoc/latest/document-structure
7:96   200 OK   https://docs.asciidoctor.org/asciidoc/latest/document-structure
11:1   200 OK   http://docs.asciidoctor.org/asciidoc/latest/key-concepts
13:22   200 OK   https://docs.asciidoctor.org/asciidoc/latest/key-concepts
19:30   200 OK   http://docs.asciidoctor.org/asciidoc/latest/document-processing
19:124   200 OK   https://docs.asciidoctor.org/asciidoc/latest/document-processing
Exit code: 0
```

## Invalid Links Example

Run

```shell
yarn asciidoc-link-check ./test/data/invalid-links-file.adoc
```

The exit code would be `-1` and every link found is not alive.

```shell
7:30   FAILED   http://docs.asciidocor.org/asciidoc/latest/document-structure
7:97   FAILED   https://docs.asciidocor.org/asciidoc/latest/document-structure
Exit code: -1
```