class RequestService {

    // async function
    async getRequest(url, options = {}) {
        let data = await(await(fetch(url, options)
            .then((res) => res.json())
            .catch((err) => {
                console.log('Error: ', err); // eslint-disable-line
                return err;
            })
        ));

        return data;
    }
}

const requestService = new RequestService();

export {requestService};
