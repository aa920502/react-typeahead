import axios from 'axios';

const url = axios.create({
    baseURL: 'https://api.publicapis.org/',
});

export const getApiSuggestions = (word) => {
    let result = url
        .get(`/entries?title=${word}`)
        .then(response => {
            console.log("GET call success ", response);
            return response.data;
        })
        .catch(error => {
            console.log("there is an error in this request")
            return error;
        });

    return result;
};