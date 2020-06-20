import React from 'react'
import FilterButton from './filterButton'
import { FilterModes } from './visibilityFilterSlice'

const Footer: React.FC = () => {

    return (
        <div>
            <FilterButton filterType={FilterModes.ShowAll} text="All" />
            <FilterButton filterType={FilterModes.ShowActive} text="Active" />
            <FilterButton filterType={FilterModes.ShowCompleted} text="Done" />
        </div>
    )
}
export default Footer