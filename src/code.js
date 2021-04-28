function getData(){
	let url = getUrl();
	let data = undefined;
    axios.get(url, {
      })
      .then(function (response) {
        data = response.data.terrain;
		console.log(data);
      })
      .catch(function (error) {
        console.log(error);
    });
}

function getUrl(){
	let room = document.getElementById('room').value;
	let shard = document.getElementById('shard').value;
	let url = 'https://cors.bridged.cc/https://screeps.com/api/game/room-terrain?shard=' + shard + '&room=' + room;
	return url
}