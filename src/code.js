function getData(){
    let token = document.getElementById('token')
    axios.get('https://screeps.com/api/game/time', {
        params: {
            'shard': 'shard2'
        }
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
    });
}