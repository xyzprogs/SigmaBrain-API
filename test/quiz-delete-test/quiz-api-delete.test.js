const testApi = require("./apicall")

test('test quiz delete api', ()=>{
    return testApi.testDeleteQuizApi()
        .then(data=>{
            console.log(data.data)
            expect(data.status).toEqual(200)
        })
})

test('test quiz question delete api', ()=>{
    return testApi.testDeleteQuizQuestionApi()
        .then(data=>{
            console.log(data.data)
            expect(data.status).toEqual(200)
        })
})

test('test quiz question choice delete api', ()=>{
    return testApi.testDeleteQuestionChoiceApi()
        .then(data=>{
            console.log(data.data)
            expect(data.status).toEqual(200)
        })
})