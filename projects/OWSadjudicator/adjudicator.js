function dieRoller(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

function surfaceStrike(incoming, defense=[], cap=false, aew=false, io=[]) {
  const missiles = incoming;
  if (defense.length > 0) {
    let total_sm = 0;
    for (const [key, value] of Object.entries(defense)) {
      if (key == 0) {
        continue
      } else {
        total_sm += value[1];
      }
    }
    console.log(total_sm)
  }
  
  const missile_rolls = []
  for (const [key, value] of Object.entries(missiles)) {
    for (let i = 0; i < value; i++) {
      missile_rolls.push(dieRoller(key))
    }
  }
  return missile_rolls.filter(x => x >= defense);
}

const doc = document.getElementById('testArea');

const inbound_missiles = {12: 4};
const defense = [4, [6 , 4], [5, 2]]
const results = surfaceStrike(inbound_missiles, defense);
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