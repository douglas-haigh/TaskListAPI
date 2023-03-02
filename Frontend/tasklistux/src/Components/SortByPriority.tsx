import React from "react"

interface Props {
    onSort:() => void;
}

export const SortByPriorityButton: React.FC<Props> = ({onSort}) => {

    return(
        <div id="SortButton">
            <button aria-label="sort tasks by priortiy" onClick={onSort}> Sort </button>
        </div>
    )
}