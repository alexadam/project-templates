import React from 'react'
import { FilterModes } from './visibilityFilterSlice'
import { setVisibilityFilter } from './visibilityFilterSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../rootReducer'

interface FilterButtonProps {
    filterType: FilterModes,
    text: string
}

const FilterButton: React.FC<FilterButtonProps> = ({ filterType, text }: FilterButtonProps) => {
    const dispatch = useDispatch()

    const currentVisibilityFilter = useSelector((state: RootState) => state.visibilityFilter)

    const onClick = () => {        
        dispatch(setVisibilityFilter(filterType))
    }

    return (
        <button disabled={currentVisibilityFilter === filterType} onClick={onClick}>{text}</button>
    )
}
export default FilterButton