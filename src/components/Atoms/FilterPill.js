import styled from "styled-components"

const Pill = styled.button`
    border-radius: 100px;
    border: none;
    font-size: 14px;
    font-weight: 700;
    line-height: 22px;
    padding: 4px 16px 4px 16px;
    width: fit-content;
    background-color: var(--secondary-200);

    ${({selected}) => selected && `
        background-color: var(--secondary-100);
    `}

`


export default function FilterPill({genreName, genreID, onClick, selected, disableClick}){
    return (
        <Pill onClick={() => onClick(genreID)} selected={selected} disabled={disableClick}>
            <span>{genreName}</span>
        </Pill>
    )
}