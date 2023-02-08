import React from "react"

interface Props {
    onSort:() => void;
}

export const SortByPriorityButton: React.FC<Props> = ({onSort}) => {

    return(
        <div id="SortButton">
        <button  onClick={onSort}> Sort </button>
        </div>
    )
}