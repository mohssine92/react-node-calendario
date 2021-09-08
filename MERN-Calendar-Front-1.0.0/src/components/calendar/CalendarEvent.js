import React from 'react'

export const CalendarEvent = ({ event }) => { // recibe todo evento

    const { title, user } = event;

    return (
        <div>
            <strong> { title } </strong>
            <span>- { user.name } </span>
        </div>
    )
}
