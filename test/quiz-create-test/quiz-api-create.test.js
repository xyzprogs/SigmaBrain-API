const testApi = require("./apicall")
// test('Verify quiz create api', ()=>{
//     //expect.assertion(1);
//     return testApi.testCreateQuizApi()
//         .then(data=>{
//             console.log(data)
//             expect(data.status).toEqual(201)
//         })
// })


// test('test quiz create api', ()=>{
//     return testApi.testCreateQuizQuestionApi()
//         .then(data=>{
//             console.log(data)
//             expect(data.status).toEqual(201)
//         })
// })

// test('test quiz question choice reate api', ()=>{
//     return testApi.testCreateQuizQuestionChoiceApi()
//         .then(data=>{
//             console.log(data)
//             expect(data.status).toEqual(201)
//         })
// })


test('test image api', ()=>{
    return testApi.testCreateQuizWithThumbnailApi()
        .then(data=>{
            console.log(data)
        })
})