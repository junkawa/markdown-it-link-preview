# markdown-it-link-preview

Markdown-it plugin to include link preview in your document.

``` Markdown
[@preview](https://github.com/junkawa/figma_jp)
```

``` HTML
<p><div class="link-preview-widget"><a href="https://github.com/junkawa/figma_jp" rel="noopener" target="_blank"><div class="link-preview-widget-title">junkawa/figma_jp</div><div class="link-preview-widget-description">Japanese Chrome Extension for figma. Contribute to junkawa/figma_jp development by creating an account on GitHub.</div><div class="link-preview-widget-url">GitHub</div></a><a class="link-preview-widget-image" href="https://github.com/junkawa/figma_jp" rel="noopener" style="background-image: url('https://repository-images.githubusercontent.com/292775522/57a0a600-f246-11ea-9b1a-078a5abb05e8');" target="_blank"></a></div></p>
```

## Install

``` Bash
npm install markdown-it-link-preview --save
```

## Use

``` Javascript
const md = require('markdown-it')();
const linkPreview = require('markdown-it-link-preview');
md.use(linkPreview);
const result = md.render(
    '[@preview](https://github.com/junkawa/figma_jp)',
);

result
/*
<p><div class="link-preview-widget"><a href="https://github.com/junkawa/figma_jp" rel="noopener" target="_blank"><div class="link-preview-widget-title">junkawa/figma_jp</div><div class="link-preview-widget-description">Japanese Chrome Extension for figma. Contribute to junkawa/figma_jp development by creating an account on GitHub.</div><div class="link-preview-widget-url">GitHub</div></a><a class="link-preview-widget-image" href="https://github.com/junkawa/figma_jp" rel="noopener" style="background-image: url('https://repository-images.githubusercontent.com/292775522/57a0a600-f246-11ea-9b1a-078a5abb05e8');" target="_blank"></a></div></p>
*/
```

## Syntax

``` Markdown
[@preview](URL)
```

## CSS sample

![Screenshot](https://user-images.githubusercontent.com/5635944/95469258-6a7bd700-09ba-11eb-9b19-54dcf86a6de6.png)

``` css
.link-preview-widget
{
    display: table;

    width: 100%;

    border: 1px solid #e6e6e6;
    border-radius: 4px;
}

.link-preview-widget-title
{
    font-size: 16px;
    font-weight: 700;

    display: -webkit-box;
    overflow: hidden;

    margin-bottom: 8px;

    word-break: break-all;

    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}

.link-preview-widget-description
{
    font-size: 12px;
    font-style: normal;
    line-height: 1.5;

    display: -webkit-box;
    overflow: hidden;

    max-height: 3em;
    margin-bottom: 4px;

    word-break: break-all;

    color: #787c7b;

    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}

.link-preview-widget-url
{
    font-size: 12px;
    font-style: normal;
    line-height: 1.5;

    display: block;

    margin-bottom: 0;

    color: #222;
}

.link-preview-widget > a
{
    display: table-cell;
    flex-direction: column;

    padding: 16px;

    cursor: pointer;
    vertical-align: middle;
    text-decoration: none;

    color: inherit;
    background-color: transparent;

    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-box-flex: 1;
    flex: 1;
}

.link-preview-widget-image
{
    width: 225px;
    min-width: 220px;
    height: 150px;
    padding: 0;

    vertical-align: middle;

    border-left: 1px solid #f2f2f2;
    border-radius: 0 3px 3px 0;
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: cover;

    -webkit-box-flex: 0;
    flex: 0;
}
```
