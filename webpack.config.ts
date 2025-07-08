import path from 'path';
import webpack from 'webpack';

import { buildWebpack } from './config/build/buildWebpack';
import { BuildMode, BuildPaths } from './config/build/types/types';

interface EnvVariables {
    mode: BuildMode,
    port: number,
    analyzer?: boolean
}

import type { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import type { Configuration as WebpackConfiguration } from 'webpack';

interface WebpackConfig extends WebpackConfiguration {
    devServer?: WebpackDevServerConfiguration;
}

export default (env: EnvVariables) => {
    const title = 'Codelang';
    const paths: BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        output: path.resolve(__dirname, 'build'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        public: path.resolve(__dirname, 'public'),
        src: path.resolve(__dirname, 'src')
    }
    const config: WebpackConfig = buildWebpack({
        port: env.port ?? 3000,
        mode: env.mode ?? 'development',
        analyzer: env.analyzer,
        paths
    });
    return config;
};