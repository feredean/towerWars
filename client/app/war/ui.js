var updateUI = function() {
  var r = Resources;
  document.getElementById('player-health').innerHTML= r.player.hp;
  document.getElementById('enemy-health').innerHTML= r.enemy.hp;
  document.getElementById('player-income').innerHTML= r.player.income;
  document.getElementById('enemy-income').innerHTML= r.enemy.income;
  document.getElementById('player-gold').innerHTML= r.player.gold;
};

var startCountdown = function() {
  var r = Resources;
  var i = 30;
  setInterval(function() {
    if (i === 0) {
      r.player.gold += r.player.income;
      i = 30;
    }
    document.getElementById('timer').innerHTML = i;
    i -= 1;
  },1000)
}

setTimeout(startCountdown, 5000);
updateUI();

(function() {
  var r = Resources;
  // creeps
  var sendOne = document.getElementById('send-one');
  var sendTwo = document.getElementById('send-two');
  var sendThree = document.getElementById('send-three');
  var sendGod = document.getElementById('send-god');
  // towers
  var selectNormalTower = document.getElementById('normal-tower');
  var selectSpeedTower = document.getElementById('speed-tower');
  var selectBladeTower = document.getElementById('blade-tower');
  // var clearTowers = document.getElementById('clear-towers');

  sendOne.addEventListener('mousedown', function() {
    sendCreep(r.creeps.one);
  })

  sendTwo.addEventListener('mousedown', function() {
    sendCreep(r.creeps.two);
  })

  sendThree.addEventListener('mousedown', function() {
    sendCreep(r.creeps.three);
  })

  sendGod.addEventListener('mousedown', function() {
    sendCreep(r.creeps.god);
  })

  selectNormalTower.addEventListener('mousedown', function() {
    selectMenu(selectNormalTower, 'normal');
  })

  selectSpeedTower.addEventListener('mousedown', function() {
    selectMenu(selectSpeedTower, 'speed');
  })

  selectBladeTower.addEventListener('mousedown', function() {
    selectMenu(selectBladeTower, 'blade');
  })
  
  // clearTowers.addEventListener('mousedown', function() {
  //   allTowers = [];
  //   r.blocks = [];
  // })

  // utility
  function clearSelect() {
    selectNormalTower.classList.remove('select');
    selectSpeedTower.classList.remove('select');
    selectBladeTower.classList.remove('select');
  }

  // actions
  function sendCreep(type) {
    if (r.player.gold - type.cost < 0) {
      return;
    }
    r.increaseIncome(2, 'player');
    r.ajustGold(-type.cost, 'player');

    var x = Math.floor(Math.random() * 17);
    var y = Math.floor(Math.random() * 3);
    type.board = 'enemy';
    var creep = new Creep(x, y, type)
    enemyCreeps.push(creep);
    socket.emit('sent', creep);
  }

  function selectMenu(node, name) {
    clearSelect();
    r.towerType = r.towerType === name ? undefined : name;
    if (r.towerType === name) {
      node.classList.add('select');
    } else {
      node.classList.remove('select')
    }
  }


}(this))