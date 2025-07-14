import type { Configuration as DevServerConfiguration, ProxyConfigArrayItem } from 'webpack-dev-server';
import { BuildOptions } from './types/types';

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
    const proxyConfig: ProxyConfigArrayItem[] = [
        {
            context: ['/api'],
            target: 'https://codelang.vercel.app',
            changeOrigin: true,
            secure: false,
            cookieDomainRewrite: 'localhost',
            pathRewrite: { '^/api': '/api' },
        },
    ];

    return {
        port: options.port ?? 3000,
        open: true,
        historyApiFallback: true,
        hot: true,
        proxy: proxyConfig,
    };
}
