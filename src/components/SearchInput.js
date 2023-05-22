import React, { useState, useMemo, useEffect } from 'react';
import debounce from 'lodash.debounce';
import { getApiSuggestions } from "../requests/index";

import { Input, Ul, Li, SuggestContainer } from './styles';

export function SearchInput({
    // loading,
    // suggestions,
    // fetchData,
    onClickFunction,
    placeholder,
}) {
    const [inputValue, setInputValue] = useState('');
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


    // When the debounced function debouncedCallback gets invoked multiple 
    // times, in bursts, it will invoke the callback only after waitTime has
    //  passed after the last invocation.
    const debouncedFetchData =
        useMemo(() => debounce((newValue) => fetchData(newValue), 1000), []);
    // Stop the invocation of the debounced function
    // after unmounting
    useEffect(() => {
        return () => {
            debouncedFetchData.cancel();
        }
    }, [debouncedFetchData]);


    const updateValue = (newValue) => {
        console.log("searching ", newValue)
        setInputValue(newValue);
        debouncedFetchData(newValue);
    };

    return (
        <div>
            <Input
                value={inputValue}
                onChange={(input) => updateValue(input.target.value)}
                placeholder={placeholder}
            />
            <SuggestContainer>
                <Ul>
                    {loading && <Li>Loading...</Li>}
                    {suggestions?.entries?.length > 0 &&
                        !loading &&
                        suggestions?.entries?.map((value, index) => (
                            <Li
                                key={`${value.API}-${index}`}
                                onClick={() => onClickFunction(value.Link)}
                            >
                                {value.API}
                            </Li>
                        ))}
                </Ul>
            </SuggestContainer>
        </div>
    );


}