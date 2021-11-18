function dieRoller(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

function surfaceStrike(incoming, defense=[], cap=false, aew=false, io=[]) {
  const dice_sides = [20, 16, 12, 10, 8, 6, 4]
  const missiles = incoming;
  if (aew) {
    console.log(missiles['4'])
    console.log(missiles['10'])

  }
  
  let total_sm = 0;
  let total_inbound = Object.values(missiles).reduce((a, b) => a + b);
  if (defense.length > 0) {
    for (const [key, value] of Object.entries(defense)) {
      if (key == 0) {
        continue;
      } else {
        total_sm += value[1];
      }
    }
  }
  console.log(total_inbound);
  const missile_rolls = []
  for (const [key, value] of Object.entries(missiles)) {
    for (let i = 0; i < value; i++) {
      missile_rolls.push(dieRoller(key))
    }
  }
  return missile_rolls.filter(x => x >= defense);
}

const doc = document.getElementById('testArea');

const inbound_missiles = {10: 1, 12: 3};
const defense = [4, [6 , 4], [5, 2]]
const results = surfaceStrike(inbound_missiles, defense, false, true, []);
doc.innerText = results;
/*
  Surface Strike
  Calculate best odds for defender, roll against that

  Modifiers:
    AEW Support (Blue Only) 2x Demo to all
    CAP Support 1x Demo 1:1
    Excess shields 1x Demo 1:1
    SIGINT/EMSO 1x Promo to all
    Disrupted C2/Active & Passive CM 1x demo to all
 */

/*
  Submarine Attack

  3. all units in ASW roll for detection
     a. if successful roll for attack
  4. Sub attacks, 1 torp per step
*/

/* 
  Surface to Air

  Missiles vs Aircraft
*/

/*
  Air to Air 

  Air vs. Air, simultaneous attacks
*/

/*
  SOF Direct Action

  Roll for detection, if not detected, roll for direct action
*/

/*
  Ground Combat


*/