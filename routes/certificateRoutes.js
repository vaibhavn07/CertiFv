const router = require('express').Router();
const axios = require('axios');
const User = require('../schemas/User');
const xlsx = require('xlsx');
const multer = require('multer');
const admin = require('firebase-admin');
const serviceAccountKey = require('../certificates-3bf86-firebase-adminsdk-q0eyq-61e4b6765f.json');
const generateHtml = require('./auxillary/htmlContent')
const generatePDFfromHTML = require('./auxillary/generateCertifiacate')
const crypto = require('crypto');
const fetchUser = require("../middleware/fetchUser")

admin.initializeApp({
	credential: admin.credential.cert(serviceAccountKey),
	storageBucket: 'gs://certificates-3bf86.appspot.com'
});


var bucket = admin.storage().bucket();
const upload = multer({ dest: 'uploads/' });


async function uploadFile(filepath, filename) {
	await bucket.upload(filepath, {
		gzip: true,
		destination: filename,
		metadata: {
			cacheControl: 'public, max-age=31536000'
		}
	});

	console.log(`${filename} uploaded to bucket.`);
}




const generateCertificate = (data) =>{
    const hash = crypto.createHash('sha256');
    
    hash.update(data.username);
    const id = hash.digest('hex');
    
    const htmlContent = generateHtml(data);
    generatePDFfromHTML(htmlContent, `./certificates/${id}.pdf`)
      .then(() => console.log('PDF generated successfully'))
      .catch(err => console.error('Error generating PDF:', err));
    return id;
}


router.post('/upload',fetchUser,upload.single('file'),async (req,res)=>{
    if(!req.file) return res.json("Empty File");
    const filePath = path.join(__dirname, req.file.path);
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; // Read the first sheet
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    for(var d in data){
      
            const user = await User.findOne({"username":d.username});
            console.log(user)
            const id = await generateCertificate(user);
            console.log(id)
            const filepath = `./certificates/${id}.pdf`;
            const  filename = `${id}.pdf`
      
            user.certificate_id = id;
            await user.save();

            uploadFile(filepath,filename);

    }
    return res.json(id);
})


router.get('/search:id',(req,res)=>{
    const id = req.params.id.slice(1,);
    
    const remoteFilePath = `${id}.pdf`;
    const localFilePath = `./certificates/${id}.pdf` 
    const options = {
        version: 'v4',
        action: 'read', 
        expires: Date.now() + 60 * 60 * 1000, 
      };

      let data;
      bucket.file(remoteFilePath).getSignedUrl(options)
        .then(signedUrls => {
          const url = signedUrls[0];
          data = signedUrls[0];
          console.log(`Generated signed URL: ${url}`);
        })
        .catch(err => {
          console.error('Error generating signed URL:', err);
        });

        return res.json();
})

router.get('/verify',fetchUser,async (req,res)=>{
    const data = req.body;

    const user = await User.findOne({"certificate_id":data.certificate_id});
    // console.log(user.username)
    console.log(data.certificate_id)
    if(!user) return res.json("Invalid").status(404);
    return res.json(user.username).status(200);

})

module.exports = router;