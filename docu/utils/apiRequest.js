const ReportRequest = {
    postData: (url, param, config = {}) => {
        return axios({
            url: `${url}v1/product-favorite/${orgId}/${STORE}/${id}`,
            method: 'POST',
            headers:{
                'X-Ecomos-Access-Token': Cookies.get('token')
            }
        })
        .then(res => ({res}))
        .catch(err => ({err}))
    }
}

export {ReportRequest}