import axios from 'axios';

const apiKey = 'f5a29b2836a216f4ae14e88ec762fc3d';

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
