const fs = require('fs');
const path = 'c:/Users/RIMANSHU/OneDrive/Desktop/Marathon/frontend/src/main.jsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace('proofOfAge: null', 'proofOfAge: null, proofOfAgeType: \'\'');

const formStartTarget = `<div className="form-row">
                <label>
                  पूरा नाम (FULL NAME) *
                  <input required name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="उदा. राहुल शर्मा" />
                </label>`;

const formStartReplacement = `<div className="form-row" style={{ marginBottom: '24px' }}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                  <span style={{ fontSize: '18px', fontWeight: 'bold' }}>लिंग चुनें (SELECT GENDER) *</span>
                  <div style={{ display: 'flex', gap: '16px', width: '100%' }}>
                    <button 
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, gender: 'पुरुष (Male)' }))}
                      style={{ flex: 1, padding: '16px', borderRadius: '8px', border: formData.gender === 'पुरुष (Male)' ? '2px solid #5c1417' : '1px solid #ccc', background: formData.gender === 'पुरुष (Male)' ? '#fcfaf7' : '#fff', fontWeight: 'bold', color: '#5c1417' }}
                    >MEN (पुरुष)</button>
                    <button 
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, gender: 'महिला (Female)' }))}
                      style={{ flex: 1, padding: '16px', borderRadius: '8px', border: formData.gender === 'महिला (Female)' ? '2px solid #5c1417' : '1px solid #ccc', background: formData.gender === 'महिला (Female)' ? '#fcfaf7' : '#fff', fontWeight: 'bold', color: '#5c1417' }}
                    >WOMEN (महिला)</button>
                  </div>
                </label>
              </div>

              {formData.gender && (
                <>
              <div className="form-row">
                <label>
                  पूरा नाम (FULL NAME) *
                  <input required name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="उदा. राहुल शर्मा" />
                </label>`;

content = content.replace(formStartTarget, formStartReplacement);

const oldGenderTarget = `<label>
                  लिंग (GENDER) *
                  <select name="gender" value={formData.gender} onChange={handleInputChange} required>
                    <option value="" disabled>
                      चुनें (Select)
                    </option>
                    <option>पुरुष (Male)</option>
                    <option>महिला (Female)</option>
                    <option>अन्य (Other)</option>
                  </select>
                </label>`;
content = content.replace(oldGenderTarget, '');

const docUploadTarget = `<div className="form-row" style={{ marginTop: "12px" }}>
                  <label>
                    आयु प्रमाण अपलोड करें (Proof of Age - Upload file) *
                    <input required type="file" name="proofOfAge" accept="image/*,.pdf" onChange={handleInputChange} style={{ padding: "10px", background: "#fff" }} />
                  </label>
                  <label>
                    फोटो अपलोड करें (Photo - Upload file) *
                    <input required type="file" name="photo" accept="image/*" onChange={handleInputChange} style={{ padding: "10px", background: "#fff" }} />
                  </label>
                </div>`;

const docUploadReplacement = `<div style={{ marginTop: "16px" }}>
                  <p style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '14px', color: '#333' }}>आयु प्रमाण चुनें (Select Proof of Age) *</p>
                  <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
                    {['10th Marksheet', '12th Marksheet', 'PAN CARD'].map(docType => (
                      <label key={docType} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <input 
                          type="radio" 
                          name="proofOfAgeType" 
                          value={docType}
                          checked={formData.proofOfAgeType === docType}
                          onChange={handleInputChange}
                          required
                        />
                        {docType}
                      </label>
                    ))}
                  </div>
                  
                  {formData.proofOfAgeType && (
                    <div className="form-row">
                      <label>
                        {formData.proofOfAgeType} अपलोड करें (Upload {formData.proofOfAgeType}) *
                        <input required type="file" name="proofOfAge" accept="image/*,.pdf" onChange={handleInputChange} style={{ padding: "10px", background: "#fff" }} />
                      </label>
                      <label>
                        फोटो अपलोड करें (Photo - Upload file) *
                        <input required type="file" name="photo" accept="image/*" onChange={handleInputChange} style={{ padding: "10px", background: "#fff" }} />
                      </label>
                    </div>
                  )}
                </div>`;

content = content.replace(docUploadTarget, docUploadReplacement);

const formEndTarget = `<div className="reg-step-actions">
                <button`;
content = content.replace(formEndTarget, `</>
              )}

              <div className="reg-step-actions">
                <button`);

fs.writeFileSync(path, content);
console.log('Successfully updated main.jsx');
