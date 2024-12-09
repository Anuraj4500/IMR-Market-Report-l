import React from 'react';

const Breadcrumb = ({ items }) => {
  return (
    <div className="container-fluid p-0">

      <section class="breadcrumbs">
        <div class="container">

          <div class="d-flex justify-content-between align-items-center">

            <ol>
              <li><a href="/home">Home</a></li>
              {items.map((item, index) => (
                <li key={index}>
                  {item.link ? <a href={item.link}>{item.label}</a> : item.label}
                </li>
              ))}
            </ol>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Breadcrumb;
