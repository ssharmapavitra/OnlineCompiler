var button = document.getElementById("btn");
const url = "https://codequotient.com/api/executeCode";
const dropdown = document.getElementById("lang");
const inBox = document.getElementById("inCode");
inBox.innerText = `print("Hello")`;
const outBox = document.getElementById("outCode");
let codeId;

//Send POST request to server on button click event
button.addEventListener("click", async () => {
	//get language
	const language = dropdown.value;
	//get code
	const code = inBox.value;
	//data to send
	let data = { code: `${code}`, langId: `${language}` };

	//send request
	fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json", // Adjust the content type if necessary
		},
		body: JSON.stringify(data),
	})
		.then((response) => response.json())
		.then((data) => {
			// Handle the response data
			getOutput(data.codeId);
		})
		.catch((error) => {
			// Handle any errors
			console.error("Error1111:", error);
		});
});

//Send GET request to server to get output of code
function getOutput(codeId) {
	let gurl = `https://codequotient.com/api/codeResult/${codeId}`;
	let limiter = 0;
	const getRequest = setInterval(() => {
		fetch(gurl)
			.then((response) => response.json())
			.then((data) => {
				// Handle the response data
				if (data.data || limiter > 10) {
					displayOutput(data);
					clearInterval(getRequest);
				}
			})
			.catch((error) => {
				// Handle any errors
				console.error("Error:", error);
			});
	}, 2000);
}

//Display output in output box
function displayOutput(data) {
	let obj = data.data;
	obj = JSON.parse(obj);
	console.log(obj, "obj\n***", typeof obj, "type");
	let output = "";
	output += obj.output;
	output += "\n\nErrors: ";
	output += obj.errors;
	outBox.value = output;
}
