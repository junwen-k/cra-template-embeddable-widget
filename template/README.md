# Getting Started with Create React App

> Leverage the power of Create React App, to create an embeddable React Widget!

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) with template [embeddable-widget](https://github.com/junwen-k/cra-template-embeddable-widget). All scripts from [Create React App](https://github.com/facebook/create-react-app) will still works.

## 🏠 Overview

An embeddable React Widget is a React App in which is intended to be displayed on any third party site. It should be portable and easy to embed on any host site in which Javascript is enabled as well as configurable for flexibility.

### Warning

> "Stuff can break" - Dan Abramov

This project overrides the default behavior and configuration of [Create React App](https://github.com/facebook/create-react-app), therefore invalidating the guarantees that come with it. Use with discretion!

### How It Works

This project uses an open source package [craco](https://github.com/gsoft-inc/craco) to modify the config used by [Create React App](https://github.com/facebook/create-react-app).

Webpack is configured to output an `Universal Module Definition (UMD)` module, in which can then be included in a webpage with a `<script>` tag referencing to the output Javascript file. For more information about bundling, please refer to [Bundle](#-bundle) section.

### Styling Solution

To avoid CSS class names conflict with the site that embeds this widget, this project uses [CSS Modules](https://github.com/css-modules/css-modules) by default, in which is supported by [Create React App](https://github.com/facebook/create-react-app) with `react-scripts@2.0.0` and higher. For more information, please refer to [this](https://create-react-app.dev/docs/adding-a-css-modules-stylesheet).

CSS in JS styling solution is also recommended to avoid CSS class names conflict as well as eliminating the need for importing the bundled CSS as the CSS will be generated directly in the Javascript file. However if preferred, vanilla CSS can work too but is not recommended as CSS class names conflict is more likely.

## 👨‍💻 Development

To start a development server, run

```sh
npm start
```

Hot Reload is enabled by default using [Create React App](https://github.com/facebook/create-react-app). During development, the widget's props can be configured by updating `src/WidgetConfig.js`. It is ignored in production build.

## 📦 Bundle

To create a production build, run

```sh
npm run build
```

Webpack is configured to output an `UMD` module. By default, the output `UMD` name will be the `name` field of `package.json`.

The entrypoints of the bundle will be in the format of

- `static/js/${npm_package_name}.${NODE_ENV}@${npm_package_version}.min.js`.
- `static/css/${npm_package_name}.${NODE_ENV}@${npm_package_version}.min.css`.

`PUBLIC_URL` and `REACT_APP_WIDGET_UMD` can be configured via `.env`.

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React Widget Demo</title>
    <!-- Uncomment if React and ReactDOM is not bundled. -->
    <!--
        <script crossorigin src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
        <script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
    -->
    <link type="text/css" rel="stylesheet" href="http://localhost:5000/static/css/%NPM_PACKAGE_NAME%.production@%NPM_PACKAGE_VERSION%.min.css"></link>
    <script src="http://localhost:5000/static/js/%NPM_PACKAGE_NAME%.production@%NPM_PACKAGE_VERSION%.min.js"></script>
    <style>
        body {
            align-items: center;
            display: flex;
            height: 100vh;
            margin: 0;
        }

        .widgets-wrapper {
            display: flex;
            flex: 1;
            justify-content: space-around;
        }

        .widget-label {
            color: #282c34;
            font-weight: bold;
        }
    </style>
</head>

<body>
    <section class="widgets-wrapper">
        <div>
            <p class="widget-label">Widget 1:</p>
            <div id="widget-root-1">
                <noscript>You need to enable JavaScript to run this widget.</noscript>
            </div>
        </div>
        <div>
            <p class="widget-label">Widget 2:</p>
            <div id="widget-root-2">
                <noscript>You need to enable JavaScript to run this widget.</noscript>
            </div>
        </div>
    </section>
    <script>
        window.addEventListener('load', function () {
            this['%REACT_APP_WIDGET_UMD%'].renderWidget({
                title: 'React Widget 1',
            }, document.getElementById('widget-root-1'));

            this['%REACT_APP_WIDGET_UMD%'].renderWidget({
                title: 'React Widget 2',
            }, document.getElementById('widget-root-2'));
        })
    </script>
</body>

</html>

```

### Dependencies Exclude

Dependencies can be excluded from the build by updating `craco.config.js` in which can significantly reduce the size of the bundle. This can be useful when the site already have the dependencies included as `UMD` module.

For example, if a website embeds more than one React Widget, `React` and `ReactDOM` can be excluded from all of the bundles. The site should then import `React` and `ReactDOM` directly.

```html
<script crossorigin src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
<!-- React and ReactDOM should be imported before the rest of the widget CDN. -->
```

## 🚀 Deployment

<!-- TODO -->
