import React from "react"
import './Loading.scss'

export const Loading = () => {
  return (
    <div data-testid="loading" className="Loading">
      <div className="dot data-testid"></div>
    </div>
  )
}