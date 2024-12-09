import React from 'react'

const IndustriesBreadcrumb = ({ title, description }) => {
  return (
    <div>
      <section className="breadcrumbs">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <ol>
              <li><a href="">Home</a></li>
              <li>{title}</li>
            </ol>
          </div>
          <h3>{title} Market Research Reports</h3>
          <p>{description}</p>
        </div>
      </section>
    </div>
  )
}

export default IndustriesBreadcrumb
