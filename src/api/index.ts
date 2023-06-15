import { API } from 'aws-amplify';

export const post = async (api: string, path: string, body: object) => {
    try {
        const response = await API.post(api, path, { body });
        return response;
    } catch (error) {
        console.log('Something went wrong...', error);
    }
}


export const get = async (api: string, path: string, init={}) => {
    try {
        const response = await API.get(api, path, init);
        return response;
    } catch (error) {
        console.log('Something went wrong...', error);
    }
}

export default { post, get }