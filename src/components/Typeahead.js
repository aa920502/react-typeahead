import { withDebounce, withCache, withRetry, withLatest } from "../util/util";
import { MainWrapper } from "../style";
import { SearchInput } from "./SearchInput";

const Typeahead = () => {
    return (
        <MainWrapper>
            <SearchInput />
        </MainWrapper>
    );
};

export default Typeahead;
