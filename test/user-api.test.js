const testApi = require("./apicall")
test('Verify verify user api', ()=>{
    //expect.assertion(1);
    return testApi.testVerifyApiCall()
        .then(data=>{
            console.log(data)
            // expect(data.status).toEqual(200)
        })
})

test('Verify quiz create api', ()=>{
    //expect.assertion(1);
    return testApi.testCreateQuizApi()
        .then(data=>{
            console.log(data)
            expect(data.status).toEqual(201)
        })
})
