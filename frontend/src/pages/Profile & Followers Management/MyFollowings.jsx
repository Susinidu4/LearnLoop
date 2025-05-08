import React from 'react'

export const MyFollowings = () => {

    const myData = JSON.parse(localStorage.getItem('user')) || null;
  return (
    <div>MyFollowings</div>
  )
}
