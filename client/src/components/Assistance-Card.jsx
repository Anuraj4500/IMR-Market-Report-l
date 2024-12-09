import React from 'react'

const AssistanceCard = () => {
  return (
    <div>
      <div className="card speak-profile-card p-2 mt-3">
        <div className='text-center d-flex justify-content-center mt-2'>
          <h5 className="speak-card-title mb-2 w-100 text-center">Need Assistance</h5>
        </div>
        <div className="row align-items-center">
          {/* Profile Picture Column */}
          <div className="col-md-5 col-sm-12 text-center mb-3 mb-md-0">
            <div className="profile-avatar mb-2">
              <img src="https://img.freepik.com/premium-vector/man-with-purple-shirt-blue-shirt-with-purple-collar_969863-208745.jpg?w=740"
                alt="Avatar" className="rounded-circle img-fluid" />
            </div>
          </div>
          {/* Divider */}
          <div className="col-md-1 d-none d-md-flex justify-content-center p-0">
            <div className="vertical-line"></div>
          </div>
          {/* Name, Designation, and Social Icons Column */}
          <div className="col-md-5 col-sm-12 text-center text-md-left p-0">

            <p className='speak-card-text text-primary'>Akshay Patil</p>
            <div className="social-icons justify-content-center">
              <a href="#" target="_blank" className="mx-2"><i class="fa-solid fa-phone"></i> +91-81800-96367</a><br />
              <a href="#" target="_blank" className="mx-2"><i className="fas fa-envelope"></i> Email Us</a><br />
              <a href="#" target="_blank" className="mx-2"><i className="fab fa-twitch"></i> Skype Us</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssistanceCard
