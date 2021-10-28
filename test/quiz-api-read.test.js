const testApi = require("./apicall")

test("verify get test api", ()=>{
    return testApi.testGetQuizApi()
        .then(data=>{
            expect(data.status).toEqual(200)
        })
})

test("verify get quiz api", ()=>{
    return testApi.testGetQuizApi()
        .then(data=>{
            expect(data.status).toEqual(200)
        })
})

test("verify get quiz question api", ()=>{
    return testApi.testGetQuizQuestionApi()
        .then(data=>{
            expect(data.status).toEqual(200)
        })
})

test("verify get question choice api", ()=>{
    return testApi.testGetQuestionChoiceApi()
        .then(data=>{
            expect(data.status).toEqual(200)
        })
})