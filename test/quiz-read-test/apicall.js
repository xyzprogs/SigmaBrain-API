const axios = require('axios').default
const testApi = {
    testGetQuizApi: async ()=>{
        const quizId = 1
        return axios.get("http://localhost:3000/api/quiz/"+quizId)
    },

    testGetQuizQuestionApi: async ()=>{
        const quizId = 1
        return axios.get("http://localhost:3000/api/quiz/"+quizId+"/quizQuestion")
    },

    testGetQuestionChoiceApi: async ()=>{
        const choiceId = 1
        return axios.get("http://localhost:3000/api/quiz/quizQuestionChoice/"+choiceId)
    }
}

module.exports = testApi