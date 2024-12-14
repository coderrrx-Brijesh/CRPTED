import React from 'react'

export const ListUsers = ({user}) => {
  return (
    <div className='hover:bg-gray-700 hover:cursor-pointer rounded-sm px-2 py-1 mx-2 border-b border-gray-700'>
      <p>{user.userName}</p>
      <p>{user.firstName} {user.lastName}</p>
    </div>
  ) 
}
