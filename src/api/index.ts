import { API } from 'aws-amplify';

export const post = async (api: string, path: string, body: object) => {
    try {
        const response = await API.post(api, path, { body });
        return response;
    } catch (error) {
        console.log('Something went wrong...', error);
    }
}
