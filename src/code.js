function getData(){
	let url = getUrl();
	let data = undefined;
    axios.get(url, {
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
    });
}

function getUrl(){
	let room = document.getElementById('room').value;
	let shard = document.getElementById('shard').value;
	let url = 'https://cors-anywhere.herokuapp.com/https://screeps.com/api/game/room-terrain?shard=' + shard + '&room=' + room;
	return url
}