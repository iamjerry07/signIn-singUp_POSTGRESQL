const aws = require("aws-sdk");

aws.config.update({
    accessKeyId: "process.env.AWS_ACCESS_KEY_ID",
    secretAccessKey:"process.env.AWS_SECRET_ACCESS_KEY" ,
    region: "process.env.AWS_REGION"
  })
  
  let uploadFile= async ( file) =>{
    return new Promise( function(resolve, reject) {
     let s3= new aws.S3({apiVersion: '2006-03-01'}); 
     
     let d =Date.now()
     var uploadParams= {
         ACL: "public-read",
         Bucket: "usurp_assignment", 
         Key: file.originalname+d, 
         Body: file.buffer
     }
  
     s3.upload( uploadParams, function (err, data ){
         if(err) {
             return reject({"error": err})
         }
        
         return resolve(data.Location) 
     });
  
    });
  }

  module.exports = { uploadFile}