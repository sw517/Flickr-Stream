import axios from 'axios';

const apiKey = '';

export default {
    sendRequest(method, options = {}) {
        return axios
            .get('https://api.flickr.com/services/rest', {
                params: {
                    ...{
                        format: 'json',
                        safe_search: 3,
                        method: `flickr.photos.${method}`,
                        api_key: apiKey,
                        nojsoncallback: 1,
                        per_page: 25,
                        extras: 'original_format',
                    },
                    ...options,
                },
            })
            .catch(error => {
                // eslint-disable-next-line
                console.log(error);
            });
    },
};
