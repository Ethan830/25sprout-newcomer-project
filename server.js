/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-var-requires */

import webpack from 'webpack';
import express from 'express';
import history from 'connect-history-api-fallback';
import httpProxy from 'http-proxy';

import { API_ENDPOINT, SELF_HOST_ENDPOINT } from './config/endpoint';

import config from './webpack.config';

// Target API endpoint
const host = process.env.API_ENDPOINT;

const app = express();
const compiler = webpack(config);

app.use(history());

app.use(
	require('webpack-dev-middleware')(compiler, {
		publicPath: config.output.publicPath,
		stats: {
			chunks: false,
			colors: true,
		},
	}),
);

app.use(require('webpack-hot-middleware')(compiler));

app.listen(process.env.SELF_HOST_ENDPOINT_DEV_PORT, err => {
	if (err) {
		return console.error(err);
	}

	const proxyServer = httpProxy.createProxyServer({
		target: host,
		changeOrigin: true,
	});

	proxyServer.on('proxyReq', proxyReq => {
		proxyReq.setHeader('Origin', host);
	});

	proxyServer.on('proxyRes', proxyRes => {
		proxyRes.headers['Access-Control-Allow-Headers'] = 'content-type, authorization';
		proxyRes.headers['Access-Control-Allow-Methods'] = 'PUT, POST, GET, DELETE';
		proxyRes.headers['Access-Control-Allow-Origin'] = SELF_HOST_ENDPOINT;
	});

	console.log(`Proxy ${process.env.PROXY} server ${host} start at ${API_ENDPOINT}`);

	proxyServer.listen(process.env.API_ENDPOINT_DEV_PORT);

	return console.log(`Listening at ${process.env.SELF_HOST_ENDPOINT}/`);
});
