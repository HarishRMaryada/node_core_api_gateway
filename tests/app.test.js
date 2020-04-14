
const config = require('config')
describe('App.js', () => {
    it('First test', () => {

    })

    it('validting user password', () => {
        expect(config.get('user.password')).toBe('8080')
    })
})
