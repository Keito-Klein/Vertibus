exports.ailment = () => {
    return `
*1. Flinch* ❗
*to Enemy*
Usually interrupts the enemy for 1 second, has a 3 seconds cooldown with 2 seconds break-chance duration. Cooldown varies from enemies,skills and boss difficulty.
*to Player*
Interrupts you and makes you vulnerable for 1 second, cancelling any prompted movement similar to combos.

*2. Tumble* ☄
*to Enemy*
Usually interrupts the enemy for 3 seconds, has a 15 seconds cooldown with 4 seconds break-chance duration.Cooldown varies from enemies,skills and boss difficulty.
*to Player*
Interrupts you and makes you vulnerable for 3 seconds, cancelling any prompted movement similar to combos.

*3. Stun* 💫
*to Enemy*
Immobilize the enemy for 5 seconds, has a 25 seconds cool down with 6 seconds break-chance duration. Using this before tumble and flinch prolongs the break chance duration however flinch and tumble is resisted.Cooldown varies from enemies,skills and boss difficulty.
*to Player*
Immobilizes you for 5 seconds.

*4. Knock Back* ⏸
*to Enemy*
Different attacks has different ranges of knock back. (further investigation needed). The cooldown depends on the range of knock back distance.
*to Player*
Range of knock back depends on the type of the enemy and the skill used.

*5. Poison* ☠
*to Enemy*
Dealt a fractional dmg per interval depending on the target's hp and the player's INT and DEX (further mining is needed). Has a duration of 10 seconds. Able to re-inflict as the duration ended.
*to Player*
Inflicts a 5% current hp fractional dmg everytime you use a skill or auto attack. Lasts for 10 seconds. this damage cannot kill player.

*6. Paralysis* ⚡
*to Enemy*
Delays the enemy's attacks for 2 seconds (1sec for bosses). Has a duration of 10 seconds. Able to re-inflict as the duration ended.
*to Player*
Halves your current aspd, lasts for 10 seconds.

*7. Blind* 👁
*to Enemy*
Reduces the target's accuracy by 60%(20% to bosses). Has a duration of 10 seconds. Able to re-inflict as the duration ended.
*to Player*
If the player is inflicted with it, depending on the range they are in they have a accuracy penalty. If the player is 8m or farther they suffer a 40% penalty (hit * 0.600000023841858), if they are 7m or closer they suffer a 20% penalty (hit * 0.800000011920929). Lasts for 10 seconds.

*8. Ignition* 🔥
*to Enemy*
Dealt a fractional dmg per interval depending on the target's hp (further mining is needed). Has a duration of 10 seconds. Able to re-inflict as the duration ended.
*to Player*
Inflicts a 15% current hp fractional dmg every 3 seconds. Lasts for 10 seconds. this damage cannot kill player.

*9. Freeze* ❄
*to Enemy*
Increases the delay between attacks by 100% (50% for bosses), lasts for 10 seconds. Able to re-inflict as the duration ended.
*to Player*
Reduces motion speed by 50% it's applied after the base motion speed and gspwield. Lasts for 10 seconds.

*10. Armor Break* 🛡
*to Enemy*
Reduces the target's m/def by 50%, the total def is calculated from the parts first then armor break then mag/phy pierce is applied. Lasts for 5 seconds. Able to re-inflict as the duration ended.
*to Player*
Reduces your by physical and magical resistance by -50%.Lasts for 5 seconds. Able to re-inflict as the duration ended.

*11. Slow* 🕸
*to Enemy*
Reduces target's movement speed by 50%(25% for bosses), lasts for 10 seconds. Able to re-inflict as the duration ended.
*to Player*
Reduces movement speed by -50%, lasts for 10 seconds. Able to re-inflict as the duration ended.

*12. Stop* ⛔
*to Enemy*
Binds the enemy to it's current position for 10 seconds, has a 50 seconds cooldown. Less effective against bosses as it only reduces bosses' movement speed by 50% (it does not bind the bosses) , more effective with mobs and mini bosses. Attacks patterns such as linear dash or charging attacks can bypass stop.
*to Player*
Binds the player to it's current position. Using motion skills like charging slash can bypass stop.

*13. Fear* 👻
*to Enemy*
Has a 30% to cancel the target's attack (10% for bosses), lasts for 10 seconds.Able to re-inflict as the duration ended.
*to Player*
Has a 30% chance to cancel any kind of attack.

*14. Dizzy* 😵
*to Enemy*
Disables the enemy's both evasion rate and guard rate (halves guard/Eva rate for bosses).Able to re-inflict as the duration ended.
*to Player*
Halves evasion and guard rates, lasts 10 seconds. Able to re-inflict as the duration ended.

*15. Lethargy* 💪
*to Enemy*
Reduces dmg dealt by 30% (dmg * 0.699999988079071), lasts for 10 seconds. Able to re-inflict as the duration ended.
*to Player*
Reduces dmg dealt by 30%.

*16. Weaken* 📉
*to Enemy*
Reduces Target's mdef by 25%.
*to Player*
Increases original mp cost for skills by +100mp, lasts for 5 seconds. Able to re-inflict as the duration ended.

*17. Silence* 😐
Unable to cast Magic skill.

*18. Bleed* 🩸
Unable to cast Physcal skill.

*19. Fatigue* 🥵
*to Enemy/Player*
Halves current stability, all stability reduction is applied first then fatigue, last is graze.

*20. Dazzle* ☀
*to Enemy*
If the enemy is under this effect it doubles player's weapon Graze treshold, lasts for 10 seconds. Has a cooldown of 50 seconds.

*21. Mana explosion* 💥
*to Player*
Upon end duration, consume all mp remain to 0 and deal damge equal to current MPx10.

*22. Sleep* 💤
*to Enemy*
Incapacitate for a long time, awake upon taking attack, field boss restore 3% of max HP when awake.
*to Player*
Incapacitate for a long time, awake upon taking attack, enable natural regeneration.

*23. Sick* 💊
*to Player*
Lower aliment resistance by -50% (can get hit by it even if u have 100% aliment resistance).

*24. Curse* 🎭
*to Player*
Lower players CRT damage% by -50%.

*25. Item Disable* 🚫
*to Player*
Cannot use item

*26. Overide* ⏩
*to Player*
Consume HP when insufficient MP to perform skill, also apply tenacity to all skill in combo (not replace exist tag).

*27. Suction* 🌪
*to Enemy*
Pull to the center of attack, 50% pull chance for bosses.
*to Player*
Pull to the center of attack, disable evaion and guard for 1s when being hit.

*28. Petrified* ⬛
*to Player*
Absolutely dodge +100%, & Remove current aggro by 99%.

*29. Inversion* 🔁
*to Player*
Switch your current HP% and current MP%

- ${global.botName} -
`
}