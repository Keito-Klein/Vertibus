date = new Date().toLocaleDateString('en-US', { weekday: 'long' });
exports.maze = (query) => {
    query = query.toLowerCase()
        if (query == "drop") {
            switch(date) {
    
    case "Saturday" :
    return `
    Drop Guild Maze Saturday(Chocolatte chest)
    NB : High Gemstone
    
    *1. Colored Shard*
    *2. Gemstone :*
    - Beryl
    - Ruby
    - Topaz
    - Aquamarine
    - Onyx
    - Red Agate
    - Lapiz Lazuli
    - Sapphire
    - Tormarine
    - Emerald
    - Amethyst
    - Garnet
    - Rose Quartz
    - Zircon
    - Peridot
    - Citrine
    *3. Anti Degradation*
    (F1-600) Anti Degradation
    (F601-900) Anti Degradation Super
    (F901-1000) Anti Degradation Hyper
    *4. Reffinement Powder*
    (F1-600) Reffinement Powder
    (F601-900) Reffinement Powder Super
    (F901-1000) Reffinement Powder Hyper
    *5. Magic Hammer*
    (F1-600) Magic Hammer
    (F601-900) Magic Hammer Super
    (F901-1000) Magic Hammer Hyper
    *6. Tattered Catalog* (Rare)
    *7. Maze Gem* (Rare)
    *8. Skill Book* ((F601-1000) Rare)
    - Book of Darkness
    - Book of Dancer
    - Book of Magic Warrior
    - Book of Minstrel
    - Book of Unarmed
    - Book of Ninja
    `
    
    case 'Sunday' :
    return `
    Drop Guild Maze Sunday(Light Green)
    NB : Gigh Ores Drops
    
    *1. Light Shard*
    *2. Gemstone :*
    - MoonStone
    - Sunstone
    - Pearl
    - Obsidian
    - Diamond
    *3. Ores :*
    - High-Purity Iron
    - High-Purity Damascus
    - High-Purity Mithril
    - High-Purity Orichalcum
    *4. Tattered Catalog* (Rare)
    *5. Maze Gem* (Rare)
    *6. Skill Books* ((F601-1000) Rare)
    - Book of Darkness
    - Book of Dancer
    - Book of Magic Warrior
    - Book of Minstrel
    - Book of Unarmed
    - Book of Ninja
    *7. Gender Switch Stone* (Super RARE)
    `
    
    case 'Monday' :
    return `
    Drop Guild Maze Monday(Purple)
    
    *1. Light Shard*
    *2. Colored Shard
    *3. Gemstone :*
    - Beryl
    - Ruby
    - Topaz
    - Aquamarine
    - Onyx
    - Red Agate
    - MoonStone
    *4. Anti Degradation*
    (F1-600) Anti Degradation
    (F601-900) Anti Degradation Super
    (F901-1000) Anti Degradation Hyper
    *5. Reffinement Powder*
    (F1-600) Reffinement Powder
    (F601-900) Reffinement Powder Super
    (F901-1000) Reffinement Powder Hyper
    *6. Magic Hammer*
    (F1-600) Magic Hammer
    (F601-900) Magic Hammer Super
    (F901-1000) Magic Hammer Hyper
    *7. Ores :*
    - High-Purity Iron
    - High-Purity Damascus
    - High-Purity Mithril
    - High-Purity Orichalcum
    *8. Tattered Catalog* (Rare)
    *9. Maze Gem* (Rare)
    *10. Hair Catalog* (Rare)
    `
    
    case 'Tuesday' :
    return `
    Drop Guild Maze Tuesday(Red)
    
    *1. Light Shard*
    *2. Colored Shard
    *3. Gemstone :*
    - Beryl
    - Ruby
    - Topaz
    - Lapiz Lazuli
    - Sapphire
    - Tormarine
    - SunStone
    *4. Anti Degradation*
    (F1-600) Anti Degradation
    (F601-900) Anti Degradation Super
    (F901-1000) Anti Degradation Hyper
    *5. Reffinement Powder*
    (F1-600) Reffinement Powder
    (F601-900) Reffinement Powder Super
    (F901-1000) Reffinement Powder Hyper
    *6. Magic Hammer*
    (F1-600) Magic Hammer
    (F601-900) Magic Hammer Super
    (F901-1000) Magic Hammer Hyper
    *7. Ores :*
    - High-Purity Iron
    - High-Purity Damascus
    - High-Purity Mithril
    - High-Purity Orichalcum
    *8. Tattered Catalog* (Rare)
    *9. Maze Gem* (Rare)
    *10. Hair Catalog* (Rare)
    `

    case 'Wednesday' :
        return `
    Drop Guild Maze Wednesday(Blue)
    
    *1. Light Shard*
    *2. Colored Shard
    *3. Gemstone :*
    - Lapiz Lazuli
    - Sapphire
    - Tormarine
    - Emerald
    - Amethyst
    - Garnet
    - Pearl
    *4. Anti Degradation*
    (F1-600) Anti Degradation
    (F601-900) Anti Degradation Super
    (F901-1000) Anti Degradation Hyper
    *5. Reffinement Powder*
    (F1-600) Reffinement Powder
    (F601-900) Reffinement Powder Super
    (F901-1000) Reffinement Powder Hyper
    *6. Magic Hammer*
    (F1-600) Magic Hammer
    (F601-900) Magic Hammer Super
    (F901-1000) Magic Hammer Hyper
    *7. Ores :*
    - High-Purity Iron
    - High-Purity Damascus
    - High-Purity Mithril
    - High-Purity Orichalcum
    *8. Tattered Catalog* (Rare)
    *9. Face Catalog* (Rare)
    *10. Hair Catalog* (Rare)
    `
    
    case 'Thursday' :
        return `
    Drop Guild Maze Thursday(Green)
    
    *1. Light Shard*
    *2. Colored Shard
    *3. Gemstone :*
    - Emerald
    - Amethyst
    - Garnet
    - Rose Quartz
    - Zircon
    - Peridot
    - Obsidian
    *4. Anti Degradation*
    (F1-600) Anti Degradation
    (F601-900) Anti Degradation Super
    (F901-1000) Anti Degradation Hyper
    *5. Reffinement Powder*
    (F1-600) Reffinement Powder
    (F601-900) Reffinement Powder Super
    (F901-1000) Reffinement Powder Hyper
    *6. Magic Hammer*
    (F1-600) Magic Hammer
    (F601-900) Magic Hammer Super
    (F901-1000) Magic Hammer Hyper
    *7. Ores :*
    - High-Purity Iron
    - High-Purity Damascus
    - High-Purity Mithril
    - High-Purity Orichalcum
    *8. Tattered Catalog* (Rare)
    *9. Face Catalog* (Rare)
    *10. Hair Catalog* (Rare)
    `
    
    case 'Friday' :
        return `
    Drop Guild Maze Friday(Light Purple)
    
    *1. Light Shard*
    *2. Colored Shard
    *3. Gemstone :*
    - Aquamarine
    - Onyx
    - Rose Quartz
    - Zircon
    - Peridot
    - Diamond
    - Citrine
    *4. Anti Degradation*
    (F1-600) Anti Degradation
    (F601-900) Anti Degradation Super
    (F901-1000) Anti Degradation Hyper
    *5. Reffinement Powder*
    (F1-600) Reffinement Powder
    (F601-900) Reffinement Powder Super
    (F901-1000) Reffinement Powder Hyper
    *6. Magic Hammer*
    (F1-600) Magic Hammer
    (F601-900) Magic Hammer Super
    (F901-1000) Magic Hammer Hyper
    *7. Ores :*
    - High-Purity Iron
    - High-Purity Damascus
    - High-Purity Mithril
    - High-Purity Orichalcum
    *8. Tattered Catalog* (Rare)
    *9. Eye Catalog* (Rare)
    *10. Hair Catalog* (Rare)
    `
    
            }
        } else if (query == "guide") {
    return `
    Guild Maze is a dungeon-like place from which you have to find a way out. There are also monsters that will block your way while looking for chests of tangs located randomly somewhere. there is also a hidden trap as for the details about the trap:
    *1. explosion Trap*
    - damage : 40% of HP
    - effect : -
    *2. Rockfall Trap*
    - damage : 20% of HP
    - effect : Reduce MaxHP by 10
    *3. Needle Trap*
    - damage : 20% of HP
    - effect : Reduce MaxHP by 10
    *4. Jump Trap*
    - damage : -
    - effect : Attract Enemies
    The monsters in the Maze would weaken as the month's date changed. Monsters will be very strong at the beginning of the month and will be very weak at the end of the month. There is also no need to kill all mobs in the maze.
    You can ignore the chest and head to floor 600 to get a special item in the chest. Chests will also be boosted on the 3rd week of the month. The chest will change color based on the day (type "/maze drop" for details).
    You can play with party members (NPC/Mercenaries not included) and don't worry if one of the party members dies/knocks. they can still open the chest & show the way to the next floor.
    
    that's all the Guild Maze guide that I can explain. Good luck.
    - ${global.botName} -
    `
    
        } else if (query == "build") {
            return `
    To play Guild Maze, it is recommended to use a level 1 char with the Bowgun job(Those who have T5 skill) or use Bow. Fill in the status is Full DEX/(DEX/AGI) to add aspd
    
     Build Skill :
    Crosfire lvl 10
    Twin Storm(for bowgun) lvl 10
    mp charge lvl 1 (optional. u can use ampr)
    Shukuchi lvl 1
    for equipment it is recommended to use eq which has MaxHP & MaxMP
    `
        } else {
            return console.log("enter the query !\cexample : /maze guide\n/maze build\n/maze drop")
        }
    }