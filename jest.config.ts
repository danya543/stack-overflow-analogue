module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.module\\.scss$': 'identity-obj-proxy'
    },
};
