# RVB

### Adding lambda functions to backend

	amplify add api
	amplify push

### Removing api from backend

	amplify remove api <api-name>
	amplify remove function <lambda-name>
	amplify push
 Cannot find module 'aws-sdk'",
### If getting this error: `Uncaught (in promise) API rvbAPI does not exist`

- Make sure `API` is correctly named in

		await API.post(API, PATH, { body: { ... }});


### If I need to install a library into a lambda function

- Navigate to lambda's directory: `amplify/backend/function/<function-name>/src`
- Run the following command 

		npm install <package-name>

- For instance, I had to run `npm install aws-sdk` to access DynamoDB