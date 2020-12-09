// when using the npm module, use the following syntax
// const MicrosoftGraph = require("@microsoft/microsoft-graph-client").Client;

// for fast development, simply require the generated lib without bundling the npm module

require("isomorphic-fetch");

const MicrosoftGraph = require("../../lib/src/index.js");

const secrets = require("./secrets");

const fs = require("fs");
const { consoleTestResultHandler } = require("tslint/lib/test");

const client = MicrosoftGraph.Client.init({
	defaultVersion: "beta",
	debugLogging: true,
	authProvider: (done) => {
		done(null, secrets.accessToken);
	},
});

//outlook attachment
const attachment = {
	"@odata.type": "#microsoft.graph.itemAttachment",
	name: "Holiday event",
	item: {
		"@odata.type": "microsoft.graph.event",
		subject: "Discuss gifts for children",
		body: {
			contentType: "HTML",
			content: "Let's look for funding!",
		},
		start: {
			dateTime: "2016-12-02T18:00:00",
			timeZone: "Pacific Standard Time",
		},
		end: {
			dateTime: "2016-12-02T19:00:00",
			timeZone: "Pacific Standard Time",
		},
	},
};
const messageId = "AAMkADZiNzhhNTVkLWU5MDEtNGNlNy1hMjZiLTJjN2RkNjcyNGM4NgBGAAAAAABxs3khvJ1fSYvq33QgqqSJBwBC_D0Xqz_3TKBt1JyxMQ_VAAAAAAEMAABC_D0Xqz_3TKBt1JyxMQ_VAABXfFvxAAA=";

//   let res =  client.api(`/me/messages/${messageId}/attachments`)
//       .post(attachment).then((response) => {
//         console.log(response);
//         console.log("File Uploaded Successfully.!!");
//     })
//     .catch((error) => {
//         throw error;
//     });

//out look
function uploadFile() {
	fs.readFile("./test1.pdf", {}, function(err, file) {
		if (err) {
			throw err;
		}
		let fileName = "test1.pdf";
		//console.log(file.length);
		oneDriveLargeFileUpload(client, file, fileName)
			.then((response) => {
				console.log(response.headers);
				console.log("File Uploaded Successfully.!!");
			})
			.catch((error) => {
				throw error;
			});
	});
}
async function oneDriveLargeFileUpload(client, file, fileName) {
	try {
		console.log(" = size");
		const payload = {
			AttachmentItem: {
				attachmentType: "file",
				name: "test1.pdf",
				size: file.length,
			},
		};

		const messageId = "AAMkADZiNzhhNTVkLWU5MDEtNGNlNy1hMjZiLTJjN2RkNjcyNGM4NgBGAAAAAABxs3khvJ1fSYvq33QgqqSJBwBC_D0Xqz_3TKBt1JyxMQ_VAAAAAAEMAABC_D0Xqz_3TKBt1JyxMQ_VAABXfFvyAAA=";

		const uploadSession = await MicrosoftGraph.LargeFileUploadTask.createUploadSession(client, `me/messages/${messageId}/attachments/createUploadSession`, payload);
		//console.log(uploadSession);
		const fileObj = {
			name: "test1.pdf",
			content: file,
			size: file.length,
		};
		const uploadTask = new MicrosoftGraph.LargeFileUploadTask(client, fileObj, uploadSession);
		//console.log(uploadTask);

		const response = await uploadTask.upload();
		return response;
	} catch (err) {
		console.log(err);
	}
}
uploadFile();

//upload drive
// function uploadFile() {
//         // client.api('/me/drive/root/children').get().then((response) => {
//         //              console.log(response);
//         //              console.log("File Uploaded Successfully.!!");
//         //          }).catch((error) => {
//         //              console.log(error);
//         //          });
//         fs.readFile("./mouser.pdf", {}, function(err, file) {
//             if (err) {
//                 throw err;
//             }
//             let fileName = "mouser.pdf";
//             oneDriveLargeFileUpload(client, file, fileName)
//                 .then((response) => {
//                     console.log(response);
//                     console.log("File Uploaded Successfully.!!");
//                 })
//                 .catch((error) => {
//                     throw error;
//                 });
//         });
//     }
//     async function oneDriveLargeFileUpload(client, file, fileName) {
//         try {
//             let options = {
//                 path: "/Documents",
//                 fileName,
//                 rangeSize: 1024 * 1024,
//             };
//             const uploadTask = await MicrosoftGraph.OneDriveLargeFileUploadTask.create(client, file, options);
//             const response = await uploadTask.upload();
//             return response;
//         } catch (err) {
//             console.log(err);
//         }
//     }
//     uploadFile();

/*

// Update the authenticated users birthday.
client
    .api('/me')
    .header("content-type", "application/json")
    .update({
        "birthday": "1908-12-22T00:00:00Z"
    })
    .then((res) => {
        console.log("Updated my birthday");
    })
    .catch((err) => {
        console.log(err);
    });

// GET /users
client
    .api('/users')
    .version('beta')
    .get()
    .then((res) => {
        console.log("Found", res.value.length, "users");
    })
    .catch((err) => {
        console.log(err);
    });

// Find my top 5 contacts on the beta endpoint
client
    .api('/me/people')
    .version('beta')
    .top(5)
    .select("displayName")
    .get()
    .then((res) => {
        const topContacts = res.value.map((u) => {
            return u.displayName
        });
        console.log("Your top contacts are", topContacts.join(", "));
    })
    .catch((err) => {
        console.log(err);
    });

// send an email
const mail = {
    subject: "MicrosoftGraph JavaScript SDK Samples",
    toRecipients: [{
        emailAddress: {
            address: "<TO_EMAIL_ADDRESS>"
        }
    }],
    body: {
        content: "<h1>MicrosoftGraph TypeScript Connect Sample</h1><br>https://github.com/microsoftgraph/msgraph-sdk-javascript",
        contentType: "html"
    }
}

client
    .api('/users/me/sendMail')
    .post({
        message: mail
    })
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });

// GET 3 of my events
client
    .api('/me/events')
    .top(3)
    .get()
    .then((res) => {
        let upcomingEventNames = []
        for (let i = 0; i < res.value.length; i++) {
            upcomingEventNames.push(res.value[i].subject);
        }
        console.log("My calendar events include", upcomingEventNames.join(", "))
    })
    .catch((err) => {
        console.log(err);
    });

// Download a file from OneDrive
client
    .api('/me/drive/items/<ITEM_ID>/content')
    .getStream()
    .then((stream) => {
        let writeStream = fs.createWriteStream(`<FILE_NAME_WITH_EXTENSION>`);
        stream.pipe(writeStream).on('error', err => {
            console.log(err);
        });
        writeStream.on('finish', () => {
            console.log("finish");
        });
        writeStream.on('error', err => {
            console.log(err);
        });
    })
    .catch((err) => {
        console.log(err);
    });

// Upload a file to OneDrive
let readStream = fs.createReadStream("<FILE_PATH>");
client
    .api('/me/drive/root/children/<FILE_NAME_WITH_EXTENSION>/content')
    .putStream(readStream)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });
*/
