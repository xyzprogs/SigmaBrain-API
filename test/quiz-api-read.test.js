const testApi = require("./apicall")

test("verify get test api", ()=>{
    return testApi.testGetQuizApi()
        .then(data=>{
            expect(data.status).toEqual(200)
        })
})