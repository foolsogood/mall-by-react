module.exports = app => {
    const {controller} =app
    const {user}=controller
    app.router.get('/',user.register)
}