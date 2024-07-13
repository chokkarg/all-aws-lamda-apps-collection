function showS3BucketContents () {
    disableButton ('viewS3BucketButton')
    var bucketNameFld = document.getElementById ('s3BucketName');
    var bucketName = bucketNameFld.value;

    if (bucketName === '') {
        _showResultOnPopup ("Please specify Bucket Name");
        return;
    }

    _showS3BucketContents (bucketName);
}


function _showS3BucketContents (bucketName) {
    var bucket = new AWS.S3({
        params: {
            Bucket: bucketName
        }
    });

    bucket.listObjects({}, function (err, data) {
        var textToDisplay = "";

        if (err) {
            textToDisplay = 'ERROR While Fetching Bucket List\n\n' + err;
        } else {
            var count = 0;
            data.Contents.forEach(function (obj) {
                textToDisplay += "- " + obj.Key + "\n";
                count++;
                if (count >=10) {
                    return;
                }
            });

            if (count == 0)
                textToDisplay = "Bucket is Empty";
            else
                textToDisplay = "Files in S3 Bucket (upto 10 only) \n\n" + textToDisplay;
        }

        _showResultOnPopup (textToDisplay);
    });
}


function _showResultOnPopup (textToDisplay) {
    enableButton ('viewS3BucketButton', 'View Contents')
    alert (textToDisplay);
}

function uploadToS3 () {
    disableButton ('uploadToS3')
    var bucketNameFld = document.getElementById ('s3BucketName');
    var bucketName = bucketNameFld.value;


    var bucket = new AWS.S3({
        params: {
            Bucket: bucketName
        }
    });


    var files = document.getElementById('photoupload').files;
    if (!files.length) {
        return alert('Please choose a file to upload first.');
    }
    var file = files[0];

    var params = {
        Bucket: bucketName, /* required */
        Key: file.name,
        Body: file,
        ACL: 'public-read'
    };

    bucket.upload (params, function (err, data) {
        if (err) {
            console.log (err, err.stack);
            alert ("Error Occurred \n\n" + err);
        }
        else {
            console.log (data.key + ' Uploaded at ' + data.Location);
            alert (data.key + ' Uploaded at ' + data.Location);
        }

        enableButton ('uploadToS3', 'Upload');
    });
}
