function getData(){
    let token = document.getElementById('token')
    axios.get('https://screeps-cros.herokuapp.com/https://screeps.com/api/auth/me', {
        params: {},
        headers: {
            'X-token': token
        }

      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
    });
}