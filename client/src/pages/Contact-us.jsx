import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import AssistanceCard from '../components/Assistance-Card';

const ContactUs = () => {
  const breadcrumbItems = [{ label: 'Contact Us' }];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    // company: '',
    designation: '',
    message: '',
    usercaptcha: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 // Define the updatePhoneCode function
 const updatePhoneCode = (e) => {
  const selectedOption = e.target.options[e.target.selectedIndex];
  const phoneCode = selectedOption.getAttribute('data-code');
  document.getElementById('phone_code').value = phoneCode || '';
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'https://imr-market-report-l.onrender.com/api/contactus';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Submission failed.');
      }

      alert('Form submitted successfully!');
      setFormData({
        ...formData,
        html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
            <h2 style="color: #0056b3; text-align: center;">New Contact Form Submission</h2>
            <p style="font-size: 16px;">You have received a new contact form submission. Below are the details:</p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                <tr>
                    <td style="font-weight: bold; padding: 5px; border: 1px solid #ddd;">Name</td>
                    <td style="padding: 5px; border: 1px solid #ddd;">${formData.name}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold; padding: 5px; border: 1px solid #ddd;">Email</td>
                    <td style="padding: 5px; border: 1px solid #ddd;">${formData.email}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold; padding: 5px; border: 1px solid #ddd;">Phone</td>
                    <td style="padding: 5px; border: 1px solid #ddd;">${formData.phone}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold; padding: 5px; border: 1px solid #ddd;">Country</td>
                    <td style="padding: 5px; border: 1px solid #ddd;">${formData.country}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold; padding: 5px; border: 1px solid #ddd;">Company</td>
                    <td style="padding: 5px; border: 1px solid #ddd;">${formData.company}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold; padding: 5px; border: 1px solid #ddd;">Designation</td>
                    <td style="padding: 5px; border: 1px solid #ddd;">${formData.designation}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold; padding: 5px; border: 1px solid #ddd;">Message</td>
                    <td style="padding: 5px; border: 1px solid #ddd;">${formData.message || 'N/A'}</td>
                </tr>
            </table>
            <p style="margin-top: 20px; font-size: 14px; color: #555;">
                <i>This is an automated message. Please do not reply to this email.</i>
            </p>
        </div>
    `,
      });

      window.location.href = '/thank-you';
    } catch (error) {
      console.error('Error:', error.message);
      alert(`Submission failed: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <Breadcrumb items={breadcrumbItems} />
    <section className="inner-page">
     
      <div className="container">
        <div className="row justify-content-center">
          <div className="section-title">
            <h2>
              Contact <span>Us</span>
            </h2>
            <p>
              Kindly complete the form provided below. This will enable our representative to reach out to you.
            </p>
          </div>
          <div className="col-lg-8">
            <form onSubmit={handleSubmit} className="php-email-form">
              <div className="row">
                <div className="col-md-6 form-group">
                  <input
                    type="text"
                    name="name"
                    className="form-control mb-3"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 form-group">
                  <input
                    type="email"
                    name="email"
                    className="form-control mb-3"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 form-group mb-3">
                    <select name="country" className="form-control" value={formData.country} onChange={handleChange} id="country" onFocus={updatePhoneCode}>
                        <option value="">Select Country</option>
                        <option value="AF" data-code="+93">Afghanistan</option>
                        <option value="AL" data-code="+355">Albania</option>
                        <option value="DZ" data-code="+213">Algeria</option>
                        <option value="AS" data-code="+1684">American Samoa</option>
                        <option value="AD" data-code="+376">Andorra</option>
                        <option value="AO" data-code="+244">Angola</option>
                        <option value="AI" data-code="+1264">Anguilla</option>
                        <option value="AG" data-code="+1268">Antigua and Barbuda</option>
                        <option value="AR" data-code="+54">Argentina</option>
                        <option value="AM" data-code="+374">Armenia</option>
                        <option value="AW" data-code="+297">Aruba</option>
                        <option value="AU" data-code="+61">Australia</option>
                        <option value="AT" data-code="+43">Austria</option>
                        <option value="AZ" data-code="+994">Azerbaijan</option>
                        <option value="BS" data-code="+1242">Bahamas</option>
                        <option value="BH" data-code="+973">Bahrain</option>
                        <option value="BD" data-code="+880">Bangladesh</option>
                        <option value="BB" data-code="+1246">Barbados</option>
                        <option value="BY" data-code="+375">Belarus</option>
                        <option value="BE" data-code="+32">Belgium</option>
                        <option value="BZ" data-code="+501">Belize</option>
                        <option value="BJ" data-code="+229">Benin</option>
                        <option value="BM" data-code="+1441">Bermuda</option>
                        <option value="BT" data-code="+975">Bhutan</option>
                        <option value="BO" data-code="+591">Bolivia</option>
                        <option value="BA" data-code="+387">Bosnia and Herzegovina</option>
                        <option value="BW" data-code="+267">Botswana</option>
                        <option value="BR" data-code="+55">Brazil</option>
                        <option value="IO" data-code="+246">British Indian Ocean Territory</option>
                        <option value="VG" data-code="+1284">British Virgin Islands</option>
                        <option value="BN" data-code="+673">Brunei</option>
                        <option value="BG" data-code="+359">Bulgaria</option>
                        <option value="BF" data-code="+226">Burkina Faso</option>
                        <option value="BI" data-code="+257">Burundi</option>
                        <option value="KH" data-code="+855">Cambodia</option>
                        <option value="CM" data-code="+237">Cameroon</option>
                        <option value="CA" data-code="+1">Canada</option>
                        <option value="CV" data-code="+238">Cape Verde</option>
                        <option value="KY" data-code="+1345">Cayman Islands</option>
                        <option value="CF" data-code="+236">Central African Republic</option>
                        <option value="TD" data-code="+235">Chad</option>
                        <option value="CL" data-code="+56">Chile</option>
                        <option value="CN" data-code="+86">China</option>
                        <option value="CX" data-code="+61">Christmas Island</option>
                        <option value="CC" data-code="+61">Cocos Islands</option>
                        <option value="CO" data-code="+57">Colombia</option>
                        <option value="KM" data-code="+269">Comoros</option>
                        <option value="CK" data-code="+682">Cook Islands</option>
                        <option value="CR" data-code="+506">Costa Rica</option>
                        <option value="HR" data-code="+385">Croatia</option>
                        <option value="CU" data-code="+53">Cuba</option>
                        <option value="CW" data-code="+599">Curaçao</option>
                        <option value="CY" data-code="+357">Cyprus</option>
                        <option value="CZ" data-code="+420">Czech Republic</option>
                        <option value="CD" data-code="+243">Democratic Republic of the Congo</option>
                        <option value="DK" data-code="+45">Denmark</option>
                        <option value="DJ" data-code="+253">Djibouti</option>
                        <option value="DM" data-code="+1767">Dominica</option>
                        <option value="DO" data-code="+1809">Dominican Republic</option>
                        <option value="TL" data-code="+670">East Timor</option>
                        <option value="EC" data-code="+593">Ecuador</option>
                        <option value="EG" data-code="+20">Egypt</option>
                        <option value="SV" data-code="+503">El Salvador</option>
                        <option value="GQ" data-code="+240">Equatorial Guinea</option>
                        <option value="ER" data-code="+291">Eritrea</option>
                        <option value="EE" data-code="+372">Estonia</option>
                        <option value="SZ" data-code="+268">Eswatini</option>
                        <option value="ET" data-code="+251">Ethiopia</option>
                        <option value="FK" data-code="+500">Falkland Islands</option>
                        <option value="FO" data-code="+298">Faroe Islands</option>
                        <option value="FJ" data-code="+679">Fiji</option>
                        <option value="FI" data-code="+358">Finland</option>
                        <option value="FR" data-code="+33">France</option>
                        <option value="GF" data-code="+594">French Guiana</option>
                        <option value="PF" data-code="+689">French Polynesia</option>
                        <option value="GA" data-code="+241">Gabon</option>
                        <option value="GM" data-code="+220">Gambia</option>
                        <option value="GE" data-code="+995">Georgia</option>
                        <option value="DE" data-code="+49">Germany</option>
                        <option value="GH" data-code="+233">Ghana</option>
                        <option value="GI" data-code="+350">Gibraltar</option>
                        <option value="GR" data-code="+30">Greece</option>
                        <option value="GL" data-code="+299">Greenland</option>
                        <option value="GD" data-code="+1473">Grenada</option>
                        <option value="GU" data-code="+1671">Guam</option>
                        <option value="GT" data-code="+502">Guatemala</option>
                        <option value="GG" data-code="+44">Guernsey</option>
                        <option value="GN" data-code="+224">Guinea</option>
                        <option value="GW" data-code="+245">Guinea-Bissau</option>
                        <option value="GY" data-code="+592">Guyana</option>
                        <option value="HT" data-code="+509">Haiti</option>
                        <option value="HN" data-code="+504">Honduras</option>
                        <option value="HK" data-code="+852">Hong Kong</option>
                        <option value="HU" data-code="+36">Hungary</option>
                        <option value="IS" data-code="+354">Iceland</option>
                        <option value="IN" data-code="+91">India</option>
                        <option value="ID" data-code="+62">Indonesia</option>
                        <option value="IR" data-code="+98">Iran</option>
                        <option value="IQ" data-code="+964">Iraq</option>
                        <option value="IE" data-code="+353">Ireland</option>
                        <option value="IM" data-code="+44">Isle of Man</option>
                        <option value="IL" data-code="+972">Israel</option>
                        <option value="IT" data-code="+39">Italy</option>
                        <option value="CI" data-code="+225">Ivory Coast</option>
                        <option value="JM" data-code="+1876">Jamaica</option>
                        <option value="JP" data-code="+81">Japan</option>
                        <option value="JE" data-code="+44">Jersey</option>
                        <option value="JO" data-code="+962">Jordan</option>
                        <option value="KZ" data-code="+7">Kazakhstan</option>
                        <option value="KE" data-code="+254">Kenya</option>
                        <option value="KI" data-code="+686">Kiribati</option>
                        <option value="XK" data-code="+383">Kosovo</option>
                        <option value="KW" data-code="+965">Kuwait</option>
                        <option value="KG" data-code="+996">Kyrgyzstan</option>
                        <option value="LA" data-code="+856">Laos</option>
                        <option value="LV" data-code="+371">Latvia</option>
                        <option value="LB" data-code="+961">Lebanon</option>
                        <option value="LS" data-code="+266">Lesotho</option>
                        <option value="LR" data-code="+231">Liberia</option>
                        <option value="LY" data-code="+218">Libya</option>
                        <option value="LI" data-code="+423">Liechtenstein</option>
                        <option value="LT" data-code="+370">Lithuania</option>
                        <option value="LU" data-code="+352">Luxembourg</option>
                        <option value="MO" data-code="+853">Macau</option>
                        <option value="MK" data-code="+389">North Macedonia</option>
                        <option value="MG" data-code="+261">Madagascar</option>
                        <option value="MW" data-code="+265">Malawi</option>
                        <option value="MY" data-code="+60">Malaysia</option>
                        <option value="MV" data-code="+960">Maldives</option>
                        <option value="ML" data-code="+223">Mali</option>
                        <option value="MT" data-code="+356">Malta</option>
                        <option value="MH" data-code="+692">Marshall Islands</option>
                        <option value="MR" data-code="+222">Mauritania</option>
                        <option value="MU" data-code="+230">Mauritius</option>
                        <option value="YT" data-code="+262">Mayotte</option>
                        <option value="MX" data-code="+52">Mexico</option>
                        <option value="FM" data-code="+691">Micronesia</option>
                        <option value="MD" data-code="+373">Moldova</option>
                        <option value="MC" data-code="+377">Monaco</option>
                        <option value="MN" data-code="+976">Mongolia</option>
                        <option value="ME" data-code="+382">Montenegro</option>
                        <option value="MS" data-code="+1664">Montserrat</option>
                        <option value="MA" data-code="+212">Morocco</option>
                        <option value="MZ" data-code="+258">Mozambique</option>
                        <option value="MM" data-code="+95">Myanmar</option>
                        <option value="NA" data-code="+264">Namibia</option>
                        <option value="NR" data-code="+674">Nauru</option>
                        <option value="NP" data-code="+977">Nepal</option>
                        <option value="NL" data-code="+31">Netherlands</option>
                        <option value="NC" data-code="+687">New Caledonia</option>
                        <option value="NZ" data-code="+64">New Zealand</option>
                        <option value="NI" data-code="+505">Nicaragua</option>
                        <option value="NE" data-code="+227">Niger</option>
                        <option value="NG" data-code="+234">Nigeria</option>
                        <option value="NU" data-code="+683">Niue</option>
                        <option value="NF" data-code="+672">Norfolk Island</option>
                        <option value="KP" data-code="+850">North Korea</option>
                        <option value="MP" data-code="+1670">Northern Mariana Islands</option>
                        <option value="NO" data-code="+47">Norway</option>
                        <option value="OM" data-code="+968">Oman</option>
                        <option value="PK" data-code="+92">Pakistan</option>
                        <option value="PW" data-code="+680">Palau</option>
                        <option value="PS" data-code="+970">Palestine</option>
                        <option value="PA" data-code="+507">Panama</option>
                        <option value="PG" data-code="+675">Papua New Guinea</option>
                        <option value="PY" data-code="+595">Paraguay</option>
                        <option value="PE" data-code="+51">Peru</option>
                        <option value="PH" data-code="+63">Philippines</option>
                        <option value="PL" data-code="+48">Poland</option>
                        <option value="PT" data-code="+351">Portugal</option>
                        <option value="PR" data-code="+1">Puerto Rico</option>
                        <option value="QA" data-code="+974">Qatar</option>
                        <option value="CG" data-code="+242">Republic of the Congo</option>
                        <option value="RE" data-code="+262">Reunion</option>
                        <option value="RO" data-code="+40">Romania</option>
                        <option value="RU" data-code="+7">Russia</option>
                        <option value="RW" data-code="+250">Rwanda</option>
                        <option value="BL" data-code="+590">Saint Barthelemy</option>
                        <option value="SH" data-code="+290">Saint Helena</option>
                        <option value="KN" data-code="+1869">Saint Kitts and Nevis</option>
                        <option value="LC" data-code="+1758">Saint Lucia</option>
                        <option value="MF" data-code="+590">Saint Martin</option>
                        <option value="PM" data-code="+508">Saint Pierre and Miquelon</option>
                        <option value="VC" data-code="+1784">Saint Vincent and the Grenadines</option>
                        <option value="WS" data-code="+685">Samoa</option>
                        <option value="SM" data-code="+378">San Marino</option>
                        <option value="ST" data-code="+239">Sao Tome and Principe</option>
                        <option value="SA" data-code="+966">Saudi Arabia</option>
                        <option value="SN" data-code="+221">Senegal</option>
                        <option value="RS" data-code="+381">Serbia</option>
                        <option value="SC" data-code="+248">Seychelles</option>
                        <option value="SL" data-code="+232">Sierra Leone</option>
                        <option value="SG" data-code="+65">Singapore</option>
                        <option value="SX" data-code="+1721">Sint Maarten</option>
                        <option value="SK" data-code="+421">Slovakia</option>
                        <option value="SI" data-code="+386">Slovenia</option>
                        <option value="SB" data-code="+677">Solomon Islands</option>
                        <option value="SO" data-code="+252">Somalia</option>
                        <option value="ZA" data-code="+27">South Africa</option>
                        <option value="KR" data-code="+82">South Korea</option>
                        <option value="SS" data-code="+211">South Sudan</option>
                        <option value="ES" data-code="+34">Spain</option>
                        <option value="LK" data-code="+94">Sri Lanka</option>
                        <option value="SD" data-code="+249">Sudan</option>
                        <option value="SR" data-code="+597">Suriname</option>
                        <option value="SJ" data-code="+47">Svalbard and Jan Mayen</option>
                        <option value="SE" data-code="+46">Sweden</option>
                        <option value="CH" data-code="+41">Switzerland</option>
                        <option value="SY" data-code="+963">Syria</option>
                        <option value="TW" data-code="+886">Taiwan</option>
                        <option value="TJ" data-code="+992">Tajikistan</option>
                        <option value="TZ" data-code="+255">Tanzania</option>
                        <option value="TH" data-code="+66">Thailand</option>
                        <option value="TG" data-code="+228">Togo</option>
                        <option value="TK" data-code="+690">Tokelau</option>
                        <option value="TO" data-code="+676">Tonga</option>
                        <option value="TT" data-code="+1868">Trinidad and Tobago</option>
                        <option value="TN" data-code="+216">Tunisia</option>
                        <option value="TR" data-code="+90">Turkey</option>
                        <option value="TM" data-code="+993">Turkmenistan</option>
                        <option value="TC" data-code="+1649">Turks and Caicos Islands</option>
                        <option value="TV" data-code="+688">Tuvalu</option>
                        <option value="UG" data-code="+256">Uganda</option>
                        <option value="UA" data-code="+380">Ukraine</option>
                        <option value="AE" data-code="+971">United Arab Emirates</option>
                        <option value="GB" data-code="+44">United Kingdom</option>
                        <option value="US" data-code="+1">United States</option>
                        <option value="UY" data-code="+598">Uruguay</option>
                        <option value="UZ" data-code="+998">Uzbekistan</option>
                        <option value="VU" data-code="+678">Vanuatu</option>
                        <option value="VA" data-code="+379">Vatican</option>
                        <option value="VE" data-code="+58">Venezuela</option>
                        <option value="VN" data-code="+84">Vietnam</option>
                        <option value="WF" data-code="+681">Wallis and Futuna</option>
                        <option value="EH" data-code="+212">Western Sahara</option>
                        <option value="YE" data-code="+967">Yemen</option>
                        <option value="ZM" data-code="+260">Zambia</option>
                        <option value="ZW" data-code="+263">Zimbabwe</option>
                    </select>
                </div>
                <div className="col-md-2 form-group pr-0">
                    <input type="text" name="phone_code" id="phone_code" className="form-control" placeholder="Ph.Code" readOnly />
                </div>
                <div className="col-md-4 mb-3">
                    <input type="tel" className="form-control" name="phone" id="phone" placeholder="Your Phone" required
                        value={formData.phone} onChange={handleChange} />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 form-group">
                  <input
                    type="text"
                    name="company"
                    className="form-control mb-3"
                    placeholder="Company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 form-group">
                  <input
                    type="text"
                    name="designation"
                    className="form-control mb-3"
                    placeholder="Designation"
                    value={formData.designation}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  className="form-control mb-3"
                  rows="4"
                  placeholder="Message (Optional)"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="form-group">
                <label>Enter Captcha: 1234</label>
                <input
                  type="text"
                  className="form-control"
                  name="usercaptcha"
                  value={formData.usercaptcha}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="text-center">
                <button type="submit" className="btn request-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Contact Request'}
                </button>
              </div>
            </form>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <div className="card-header style-card-header">OUR OFFICES</div>
              <div className="card-body">
                <h6><b>IMR Market Reports</b></h6>
                <p>
                  <strong>APAC Office:</strong> Office No. 403, Saudamini Commercial Complex, Kothrud, Pune, India 411038
                </p>
              </div>
            </div>
            <AssistanceCard />
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default ContactUs;
