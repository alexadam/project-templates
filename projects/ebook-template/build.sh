#!/bin/sh

pandoc -o ebook.epub \
    --css style.css \
    --toc --toc-depth=1 \
    --epub-cover-image=content/cover.png \
    metadata.yaml \
    content/chapters/ch1.md \
    content/chapters/ch2.md \
    content/chapters/ch3.md 