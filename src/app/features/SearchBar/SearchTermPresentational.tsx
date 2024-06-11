import React, {ChangeEvent, memo} from "react";
import './searchTerm.css';
import {Icon} from "@mui/material";
import {Clear, Search} from "@mui/icons-material";

interface ISearchTermPresentationalProps {
    onClearSearchTermHandler: () => void;
    onSearchTermChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
    searchTerm: string;
}


const SearchTermPresentational = (props: ISearchTermPresentationalProps) => {
    return (
        <div id={"search-container"}>
            <Search id={"search-icon"}/>
            <input
                id={"search"}
                type="text"
                value={props.searchTerm}
                onChange={props.onSearchTermChangeHandler}
                placeholder={"Search To Do's or Rewards"}
            />
            {props.searchTerm.length > 0 && (
                <button
                    onClick={props.onClearSearchTermHandler}
                    type={"button"}
                    id={"search-clear-button"}
                >
                    <Icon>
                        <Clear />
                    </Icon>
                </button>
            )}
        </div>
    );
};

export default memo(SearchTermPresentational);