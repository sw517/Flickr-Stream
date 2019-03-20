import axios from 'axios';

const apiKey = 'f5a29b2836a216f4ae14e88ec762fc3d';

export default {

    getRecent() {
        return axios.get('https://www.flickr.com/services/rest', {
            params: {
              format: 'json',
              method: 'flickr.photos.getRecent',
              api_key: apiKey,
              nojsoncallback: 1,
              per_page: 25,
            }
          })
          .catch((error) => {
            // eslint-disable-next-line
            console.log(error);
          });
    }
}
