const {defineConfig} = require('@vue/cli-service')

module.exports = defineConfig({
    transpileDependencies: true,
    pwa: {
        name: 'Test',
        iconPaths: {
            favicon32: '',
            favicon16: '',
            appleTouchIcon: '',
            maskIcon: '',
            msTileImage: ''
        }
    }
})
