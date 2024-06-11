import React, {ChangeEvent, memo} from "react";
import SearchTermPresentational from "./SearchTermPresentational";
import {useDispatch, useSelector} from "react-redux";
import {clearSearchTerm, setSearchTerm} from "./searchTermSlice";
import {AppRootState} from "../../store";


const SearchTermContainer = (props: any) => {
    const searchTerm = useSelector<AppRootState, string>((state) => state.searchTermSlice);
    const dispatch = useDispatch();

    const onSearchTermChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const userInput = e.target.value;
        dispatch(setSearchTerm({userInput}));
    }

    const onClearSearchTermHandler = () => {
        const clearInput = "";
        dispatch(clearSearchTerm({clearInput}));
    }


    return (
        <div style={{flexGrow: '1'}}>
            <SearchTermPresentational
                onClearSearchTermHandler={onClearSearchTermHandler}
                onSearchTermChangeHandler={onSearchTermChangeHandler}
                searchTerm={searchTerm}
            />
        </div>
    );
};

// export default memo(SearchTermContainer);
export default memo(SearchTermContainer);