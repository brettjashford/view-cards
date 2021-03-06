const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config');
const webpack = require('webpack');
const open = require('openurl').open;
const getPort = require('get-port');
const path = require('path');
const compiler = webpack(webpackConfig);
const app = express();
app.set('views', 'devboard');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(webpackDevMiddleware(compiler, webpackConfig.devServer));
app.use(webpackHotMiddleware(compiler));
app.get('/', (req, res) => res.render('template'));
getPort().then(port => app.listen(port, () => {
    open(`http://localhost:${port}`);
}));
