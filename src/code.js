function getData(){
    let token = document.getElementById('token')
    axios.get('https://screeps-cros.herokuapp.com/https://screeps.com/api/game/room-terrain', {
        params: {
            'shard': "shard2",
            'room': "W4N49"
        },
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