const User = require('../../schemas/User');

const generateHtml = (id) =>{
    const user = User.find({id:id});

    const html = `<div style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f9f9f9;">
  
  <!-- Certificate Container -->
  <div style="width: 800px; height: 600px; margin: 50px auto; padding: 20px; border: 10px solid #0a529a; background-color: #fff;">
    
    <!-- Certificate Border -->
    <div style="border: 5px solid #e0e0e0; padding: 20px; height: 100%; text-align: center;">
      
      <!-- Certificate Title -->
      <h1 style="font-size: 40px; font-weight: bold; color: #0a529a; margin-bottom: 20px;">Certificate of Achievement</h1>

      <!-- Subtitle -->
      <p style="font-size: 18px; color: #333; margin-bottom: 40px;">This certificate is proudly presented to</p>

      <!-- Recipient Name -->
      <h2 style="font-size: 36px; font-weight: bold; color: #333; margin-bottom: 40px; text-decoration: underline;">${user.username}</h2>

      <!-- Description -->
      <p style="font-size: 16px; color: #666; margin-bottom: 50px;">
        For successfully completing the <span style="font-weight: bold;">${domain}</span> with outstanding performance.
      </p>

      <!-- Date -->
      <p style="font-size: 16px; color: #333; margin-bottom: 40px;">Date: <span style="font-weight: bold;">${new Date.now()}</span></p>

      <!-- Signature Line -->
      <div style="display: flex; justify-content: space-between; padding: 0 50px;">
        
        <!-- Issuer Info -->
        <div style="text-align: left;">
          <p style="margin: 0; font-size: 14px; color: #333;">Issued by:</p>
          <p style="margin: 0; font-size: 16px; font-weight: bold; color: #333;">Zidio Development</p>
          <p style="margin: 0; font-size: 14px; color: #333;">Zidio</p>
        </div>

        <!-- Signature Image (Optional) -->
        <div style="text-align: right;">
          <p style="margin: 0; font-size: 14px; color: #333;">Signature:</p>
          <img src="signature.png" alt="Signature" style="width: 150px; height: auto;">
        </div>

      </div>
    </div>
  </div>
  </div>
`;

    return html;
}
module.exports = generateHtml;