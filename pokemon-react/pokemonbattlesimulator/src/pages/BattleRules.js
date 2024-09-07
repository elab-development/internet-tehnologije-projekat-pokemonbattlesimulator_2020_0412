// src/components/BattleRules.js
import React from 'react';
import './BattleRules.css';

const BattleRules = () => {
  return (
    <div className="battle-rules">
      <h1>Battle Rules</h1>
      <section className="rules-section">
        <h2>How Wins are Calculated</h2>
        <p>
          In our battle simulator, wins are determined by the number of rounds a fighter has won. Each battle consists of multiple rounds, with each round being an independent contest. The first fighter to win a predetermined number of rounds is declared the overall winner of the battle.
        </p>
        <p>
          The number of rounds required to win a battle can vary based on the game settings or specific battle rules. For instance, a standard match might require a fighter to win 3 out of 5 rounds, while a tournament-style match might have a different structure. Additionally, if both fighters win an equal number of rounds, the match may proceed into sudden death or an additional round to determine the final winner.
        </p>
      </section>
      <section className="rules-section">
        <h2>Allowed Moves</h2>
        <ul>
          <li><strong>Attack:</strong> This is the basic move that deals damage to the opponent. Each attack move has its own damage value and may have additional effects, such as causing status conditions.</li>
          <li><strong>Defense:</strong> This move reduces the amount of damage taken from the opponent's attack. It can temporarily boost the fighter's defensive stats or activate special defensive abilities.</li>
          <li><strong>Special Attack:</strong> Special attacks are unique moves that have distinct effects beyond just dealing damage. They may include powerful, high-damage attacks or abilities that affect the opponent's stats or the battle environment.</li>
          <li><strong>Dodge:</strong> This move increases the chances of avoiding the opponent's attack. It can be particularly useful for evading high-damage or critical hits, and may also include effects like reducing the opponent's accuracy.</li>
        </ul>
      </section>
      <section className="rules-section">
        <h2>Restrictions</h2>
        <p>
          Each fighter is allowed to use only one special attack per round. This restriction is in place to maintain balance and ensure that no fighter gains an unfair advantage by repeatedly using powerful moves.
        </p>
        <p>
          Additionally, there is a time limit for each round. If the time limit expires and neither fighter has achieved the necessary conditions for victory, the round may be declared a draw or the winner may be determined based on remaining health or other criteria.
        </p>
        <p>
          Fighters must also adhere to any additional restrictions set by the specific battle rules, such as limitations on the number of healing items or specific move types that can be used.
        </p>
      </section>
      <section className="rules-section">
        <h2>Items and Upgrades</h2>
        <p>
          In addition to the moves and strategies used during battles, players can enhance their Pokémon's abilities and performance through various items and upgrades. 
        </p>
        <p>
          <strong>Evolutions Stones:</strong> Players can purchase evolution stones that are used to evolve Pokémon into their advanced forms. These stones come in different types, each corresponding to a specific evolution. For example, a Fire Stone might be used to evolve a Pokémon into its Fire-type form, while a Water Stone could evolve a Water-type Pokémon.
        </p>
        <p>
          <strong>Potions:</strong> Potions are items that can be used to restore a Pokémon's HP during a battle. There are various types of potions available, ranging from basic potions that restore a small amount of HP to more advanced potions that can fully heal a Pokémon. Players can buy these potions to ensure their Pokémon remain in fighting shape throughout the battle.
        </p>
        <p>
          <strong>Training and Leveling Up:</strong> Pokémon can advance and grow stronger by gaining experience points (XP) from battles. As they accumulate XP, they level up, which increases their stats and may unlock new moves or abilities. Pokémon also have the opportunity to evolve into more powerful forms as they reach certain levels or conditions, improving their performance in battles.
        </p>
        <p>
          <strong>Training Facilities:</strong> Players can visit special training facilities to enhance their Pokémon's skills. These facilities offer various training programs and exercises that can boost a Pokémon's stats, improve their move effectiveness, and prepare them for tougher battles.
        </p>
      </section>
    </div>
  );
}

export default BattleRules;
