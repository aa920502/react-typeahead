import React, { useState } from "react";
import { withDebounce, withCache, withRetry, withLatest } from "../util/util";
import { getApiSuggestions } from "../requests/index";
import { MainWrapper } from '../style';
import { SearchInput } from './SearchInput';


const Typeahead = () => {
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async (word) => {
        if (word) {
            console.log(word);
            setLoading(true);
            try {
                let response = await getApiSuggestions(word);
                console.log(response);
                setSuggestions(response);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching API suggestions:', error);
                setLoading(false);
            }
        } else {
            setSuggestions([]);
        }
    };


    const getApiUrl = (url) => {
        window.open(url, '_blank');
    };


    return (
        <MainWrapper>
            <SearchInput
                // loading={loading}
                // suggestions={suggestions}
                // fetchData={fetchData}
                onClickFunction={getApiUrl}
                placeholder="find a public api"
            />
        </MainWrapper>
    );
};


export default Typeahead;
