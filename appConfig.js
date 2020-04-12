let appConfig ={};
    appConfig.env= 'dev',
    appConfig.apiVersion= '/api/v1',
    appConfig.port= 3200,
    appConfig.allowedCorsOrigin= '*',
    appConfig.db=
    {
        uri: 'mongodb://127.0.0.1:27017/issueTrackerDB'
    }

module.exports =
    {
        env:appConfig.env,
        port:appConfig.port,
        apiVersion:appConfig.apiVersion,
        db:appConfig.db,
        allowedCorsOrigin:appConfig.allowedCorsOrigin
    }