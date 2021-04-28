function getData(){
    axios.get('https://screeps.com/api/game/room-terrain', {
        params: {
            shard: "shard2",
            room: "W4N49"
        }
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
    });
}