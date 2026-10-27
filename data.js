/* PIXELIX content definitions. All mechanics and art are original game content. */
(() => {
  const D = {
    VERSION: 3,
    RESOURCES: {
      coins:{name:'Coins',icon:'◉',color:'#f0c566'},
      ore:{name:'Ore',icon:'⛏',color:'#b2b9c2'},
      wood:{name:'Timber',icon:'♣',color:'#bd8b52'},
      fish:{name:'Fish',icon:'♧',color:'#78c8d9'},
      herbs:{name:'Herbs',icon:'❋',color:'#8fc978'},
      hides:{name:'Hides',icon:'▰',color:'#c68b65'},
      bones:{name:'Bones',icon:'☠',color:'#e4dcc3'},
      crystals:{name:'Crystals',icon:'◆',color:'#b69bf5'},
      dust:{name:'Arcane dust',icon:'✦',color:'#a9a0ff'},
      ingots:{name:'Ingots',icon:'⬟',color:'#f0b66b'},
      potions:{name:'Potions',icon:'⚗',color:'#d783bd'},
      food:{name:'Rations',icon:'●',color:'#db9b5d'},
      runes:{name:'Runes',icon:'⌘',color:'#7fc5db'},
      essence:{name:'Ember essence',icon:'✧',color:'#ee936c'},
      research:{name:'Research',icon:'⌬',color:'#80b8ec'}
    },
    SKILLS: {
      mining:{name:'Mining',icon:'⛏',desc:'Break the earth for metals, gems, and ancient relics.',color:'#c4ad86',category:'Gathering', activities:[
        {id:'copper',name:'Copper Vein',icon:'🪨',level:1,desc:'A friendly seam of copper-rich stone.',xp:4,seconds:1.7,out:{ore:.85,coins:.12}},
        {id:'iron',name:'Iron Deep',icon:'⛏',level:5,desc:'Harder rock with better metal yields.',xp:7,seconds:1.5,out:{ore:1.05,coins:.2}},
        {id:'crystalMine',name:'Prism Hollow',icon:'💎',level:12,desc:'A luminous crack in the deep stone.',xp:12,seconds:2.2,out:{crystals:.36,ore:.4,dust:.06}},
        {id:'emberOre',name:'Ember Vein',icon:'🔥',level:24,desc:'Ore heated by the sleeping mountain.',xp:22,seconds:2,out:{ore:1.2,ingots:.12,essence:.04}},
        {id:'voidMine',name:'Void Geode',icon:'🌑',level:42,desc:'Fragments from a place without light.',xp:38,seconds:2.4,out:{crystals:.65,dust:.24,essence:.12}}
      ]},
      woodcutting:{name:'Woodcutting',icon:'♣',desc:'Harvest the strange forests that grow around the crypt.',color:'#9dc77e',category:'Gathering',activities:[
        {id:'pine',name:'Whispering Pines',icon:'🌲',level:1,desc:'Soft timber, easy to gather.',xp:3.5,seconds:1.4,out:{wood:1.05,coins:.08}},
        {id:'mosswood',name:'Mosswood Grove',icon:'🌳',level:6,desc:'Dense wood protected by old roots.',xp:7,seconds:1.8,out:{wood:1.4,herbs:.08}},
        {id:'emberwood',name:'Emberroot Trees',icon:'🍂',level:16,desc:'Warm timber with ember-red grain.',xp:14,seconds:2,out:{wood:1.35,essence:.045}},
        {id:'ancientwood',name:'Ancient Canopy',icon:'🌲',level:32,desc:'Living wood older than the keep.',xp:28,seconds:2.3,out:{wood:1.9,dust:.1,crystals:.08}}
      ]},
      fishing:{name:'Fishing',icon:'♧',desc:'Catch strange fish from subterranean rivers and forgotten lakes.',color:'#80c7dc',category:'Gathering',activities:[
        {id:'stillwater',name:'Stillwater Pool',icon:'🎣',level:1,desc:'Patient fishing in a quiet cavern pool.',xp:4,seconds:1.9,out:{fish:.75,coins:.1}},
        {id:'glowfin',name:'Glowfin Grotto',icon:'🐟',level:8,desc:'Glowing fish thrive in the blue water.',xp:9,seconds:2,out:{fish:.9,food:.18,crystals:.025}},
        {id:'lavaLake',name:'Lava-touched Lake',icon:'🌋',level:22,desc:'Rare scales from dangerously warm water.',xp:18,seconds:2.4,out:{fish:1.05,food:.28,essence:.045}},
        {id:'starwell',name:'Starwell Depths',icon:'✨',level:40,desc:'Something shines beneath the surface.',xp:34,seconds:2.5,out:{fish:.8,runes:.09,dust:.14}}
      ]},
      foraging:{name:'Foraging',icon:'❋',desc:'Find herbs, mushrooms, and magical materials in the wild.',color:'#a3d286',category:'Gathering',activities:[
        {id:'mushroom',name:'Mushroom Patch',icon:'🍄',level:1,desc:'Useful fungi and a few edible roots.',xp:3.5,seconds:1.6,out:{herbs:.8,food:.1}},
        {id:'moonherb',name:'Moonlit Herbs',icon:'🌿',level:7,desc:'Leaves that glow when the lamps go out.',xp:8,seconds:1.8,out:{herbs:1.05,dust:.04}},
        {id:'ghostorchid',name:'Ghost Orchid Hollow',icon:'🌸',level:18,desc:'A rare flower that only grows near old magic.',xp:16,seconds:2.1,out:{herbs:.8,crystals:.08,essence:.05}},
        {id:'worldroot',name:'Worldroot Garden',icon:'🌱',level:36,desc:'Roots threaded with ancient energy.',xp:31,seconds:2.5,out:{herbs:1.5,runes:.08,essence:.09}}
      ]},
      combat:{name:'Combat',icon:'⚔',desc:'Train against monsters, earn loot, and prepare for dungeon bosses.',color:'#e58d72',category:'Adventure',activities:[
        {id:'slimes',name:'Moss Slimes',icon:'🟢',level:1,desc:'Small, squishy, and surprisingly useful.',xp:5,seconds:2,out:{coins:.7,hides:.12,bones:.08},kills:.5},
        {id:'skeletons',name:'Crypt Skeletons',icon:'💀',level:7,desc:'Bone guards that still remember their duty.',xp:9,seconds:2.2,out:{coins:1.15,hides:.05,bones:.3},kills:.48},
        {id:'goblins',name:'Cinder Goblins',icon:'👺',level:15,desc:'Clever scavengers guarding their stolen piles.',xp:15,seconds:2.4,out:{coins:1.8,hides:.2,bones:.15,ore:.08},kills:.42},
        {id:'wraiths',name:'Wandering Wraiths',icon:'👻',level:28,desc:'Shades that leave arcane dust behind.',xp:26,seconds:2.6,out:{coins:2.5,dust:.18,essence:.06},kills:.38},
        {id:'stoneguard',name:'Stonebound Guard',icon:'🗿',level:45,desc:'An animated monument to a dead empire.',xp:42,seconds:3,out:{coins:4,bones:.5,crystals:.12,essence:.11},kills:.32}
      ]},
      smithing:{name:'Smithing',icon:'♨',desc:'Turn gathered metals into ingots, tools, and stronger equipment.',color:'#f0b775',category:'Crafting',activities:[
        {id:'smeltCopper',name:'Smelt Copper',icon:'🔥',level:1,desc:'Smelt ore into a dependable ingot.',xp:5,seconds:3,in:{ore:2},out:{ingots:1}},
        {id:'forgeTools',name:'Forge Tools',icon:'⚒',level:8,desc:'Use metal and timber to make useful tools.',xp:10,seconds:4,in:{ore:2,wood:2},out:{coins:2,ingots:.2}},
        {id:'starSteel',name:'Temper Starsteel',icon:'🌟',level:22,desc:'A difficult process that uses crystal dust.',xp:21,seconds:5,in:{ore:4,crystals:1},out:{ingots:1.4,essence:.04}},
        {id:'relicForge',name:'Relic Forging',icon:'⚒',level:40,desc:'Shape enchanted alloys into relic fragments.',xp:39,seconds:6,in:{ingots:3,dust:1},out:{runes:.25,essence:.1}}
      ]},
      alchemy:{name:'Alchemy',icon:'⚗',desc:'Brew tonics, turn plants into catalysts, and study odd mixtures.',color:'#d49dc6',category:'Crafting',activities:[
        {id:'herbalTonic',name:'Herbal Tonic',icon:'🧪',level:1,desc:'Make basic restorative mixtures.',xp:5,seconds:3,in:{herbs:2},out:{potions:1}},
        {id:'arcaneExtract',name:'Arcane Extraction',icon:'⚗',level:9,desc:'Distill the magic hidden in herbs.',xp:11,seconds:4,in:{herbs:3,crystals:1},out:{dust:.5,research:.15}},
        {id:'emberElixir',name:'Ember Elixir',icon:'🔥',level:21,desc:'A warming brew that holds a trace of essence.',xp:22,seconds:5,in:{herbs:3,essence:1},out:{potions:1.5,essence:.1}},
        {id:'voidCatalyst',name:'Void Catalyst',icon:'🌑',level:39,desc:'A volatile reagent for the highest crafts.',xp:40,seconds:6,in:{dust:3,crystals:2},out:{runes:.35,research:.6}}
      ]},
      cooking:{name:'Cooking',icon:'♨',desc:'Prepare food from catches and gathered ingredients to sustain expeditions.',color:'#e6aa76',category:'Crafting',activities:[
        {id:'travelRations',name:'Travel Rations',icon:'🍲',level:1,desc:'Turn fish and herbs into food for the road.',xp:4,seconds:3,in:{fish:2,herbs:1},out:{food:2}},
        {id:'heartyStew',name:'Hearty Stew',icon:'🥘',level:10,desc:'A filling meal that sells well at the keep.',xp:10,seconds:4,in:{fish:3,food:1},out:{food:3,coins:1}},
        {id:'moonFeast',name:'Moonfeast',icon:'🍜',level:25,desc:'An enchanted feast with a small research yield.',xp:24,seconds:5,in:{fish:4,herbs:3,crystals:1},out:{food:4,research:.25}}
      ]},
      runecraft:{name:'Runecraft',icon:'⌘',desc:'Carve permanent symbols into fragments of magical stone.',color:'#91c5dc',category:'Crafting',activities:[
        {id:'stoneRune',name:'Stone Rune',icon:'🔹',level:1,desc:'Learn the first stable runic pattern.',xp:6,seconds:4,in:{crystals:1,dust:1},out:{runes:1}},
        {id:'wardRune',name:'Ward Rune',icon:'🛡',level:12,desc:'Etch a ward that resists dungeon curses.',xp:14,seconds:5,in:{runes:1,ingots:1},out:{runes:1.3,research:.18}},
        {id:'riftSigil',name:'Rift Sigil',icon:'🌀',level:28,desc:'Bind a controlled tear in the veil.',xp:28,seconds:6,in:{runes:2,essence:1,dust:2},out:{essence:.28,research:.7}}
      ]}
    },
    RESEARCH: [
      {id:'keenTools',name:'Keen-edged Tools',icon:'⛏',desc:'+15% gathering speed across Mining, Woodcutting, Fishing, and Foraging.',cost:{research:20,coins:100},max:5,effect:'Gathering efficiency'},
      {id:'deepPockets',name:'Deep Pockets',icon:'🎒',desc:'+10% coin rewards from every activity per rank.',cost:{research:35,coins:160},max:5,effect:'Coin rewards'},
      {id:'steadyHands',name:'Steady Hands',icon:'⚒',desc:'+15% crafting experience per rank.',cost:{research:45,ingots:8},max:4,effect:'Crafting experience'},
      {id:'monsterLore',name:'Monster Lore',icon:'📜',desc:'+12% combat power per rank.',cost:{research:55,bones:20},max:5,effect:'Combat power'},
      {id:'idleLessons',name:'Lessons in Stillness',icon:'⌛',desc:'+20% offline training efficiency per rank.',cost:{research:75,essence:3},max:4,effect:'Offline gains'},
      {id:'extraSlot',name:'Parallel Training',icon:'⚙',desc:'Unlock an additional active skill assignment. Stacks up to 3 ranks.',cost:{research:110,crystals:8},max:3,effect:'Training slots'},
      {id:'bossScouting',name:'Boss Scouting',icon:'🗺',desc:'Reveal boss weaknesses and increase dungeon loot by 20% per rank.',cost:{research:140,runes:6},max:4,effect:'Dungeon rewards'},
      {id:'ancientFormula',name:'Ancient Formula',icon:'✧',desc:'+12% resource production to all skills per rank.',cost:{research:220,dust:15,essence:8},max:5,effect:'All production'}
    ],
    RECIPES: [
      {id:'copperPick',name:'Copper Pickaxe',icon:'⛏',slot:'tool',rarity:'common',desc:'+8% Mining output.',cost:{ingots:4,wood:6},power:2,bonus:{mining:0.08}},
      {id:'ironPick',name:'Iron Pickaxe',icon:'⚒',slot:'tool',rarity:'uncommon',desc:'+18% Mining output.',cost:{ingots:12,wood:8,coins:80},power:5,bonus:{mining:0.18},level:8},
      {id:'pineBow',name:'Pinebow',icon:'🏹',slot:'weapon',rarity:'common',desc:'+3 combat power and +5% Woodcutting output.',cost:{wood:12,hides:2},power:3,bonus:{woodcutting:0.05},level:3},
      {id:'cryptBlade',name:'Crypt Blade',icon:'🗡',slot:'weapon',rarity:'uncommon',desc:'+8 combat power.',cost:{ingots:10,bones:8,coins:100},power:8,bonus:{combat:0.1},level:10},
      {id:'wardenMail',name:'Warden Mail',icon:'🛡',slot:'armor',rarity:'rare',desc:'+20 vitality and +4 combat power.',cost:{ingots:18,hides:12,crystals:2},power:4,hp:20,level:15},
      {id:'mossguardVest',name:'Mossguard Vest',icon:'🥋',slot:'armor',rarity:'uncommon',desc:'+12 vitality and +5% Foraging output.',cost:{wood:18,hides:8,herbs:6},power:2,hp:12,bonus:{foraging:.05},level:6},
      {id:'deepsteelPick',name:'Deepsteel Pick',icon:'⛏',slot:'tool',rarity:'rare',desc:'+30% Mining output.',cost:{ingots:18,ore:28,crystals:3},power:9,bonus:{mining:.3},level:20},
      {id:'sunkenSpear',name:'Sunken Spear',icon:'🔱',slot:'weapon',rarity:'rare',desc:'+12 combat power and +8% Fishing output.',cost:{ingots:14,bones:22,fish:15},power:12,bonus:{fishing:.08},level:20},
      {id:'moonCharm',name:'Moon Charm',icon:'🌙',slot:'trinket',rarity:'rare',desc:'+10% all resource production.',cost:{crystals:5,dust:5,runes:2},power:2,bonus:{all:0.1},level:18},
      {id:'starsteelEdge',name:'Starsteel Edge',icon:'⚔',slot:'weapon',rarity:'epic',desc:'+18 combat power and +12% combat rewards.',cost:{ingots:35,crystals:12,essence:5},power:18,bonus:{combat:0.12},level:28},
      {id:'riftCloak',name:'Riftweave Cloak',icon:'🧥',slot:'armor',rarity:'epic',desc:'+50 vitality and +12% offline gains.',cost:{hides:30,runes:10,essence:10},power:12,hp:50,level:35},
      {id:'runicFocus',name:'Runic Focus',icon:'🔮',slot:'trinket',rarity:'epic',desc:'+18% Runecraft output and +5% all production.',cost:{runes:14,dust:22,essence:12},power:8,bonus:{runecraft:.18,all:.05},level:32},
      {id:'lanternGuard',name:'Lantern Guard',icon:'🏮',slot:'armor',rarity:'epic',desc:'+85 vitality and +10% Combat rewards.',cost:{ingots:45,crystals:20,essence:20,bones:50},power:17,hp:85,bonus:{combat:.1},level:42}
    ],
    ENEMIES: [
      {name:'Moss Slime',icon:'🟢',level:1,desc:'A gelatinous nuisance made of cave moss.',power:2,coins:6,loot:{hides:1,bones:1}},
      {name:'Crypt Skeleton',icon:'💀',level:5,desc:'A silent guard with a rusted spear.',power:7,coins:14,loot:{bones:3,ore:1}},
      {name:'Cinder Goblin',icon:'👺',level:12,desc:'A loud scavenger that hoards anything shiny.',power:15,coins:28,loot:{hides:2,ore:2,essence:.1}},
      {name:'Ash Wraith',icon:'👻',level:22,desc:'A soul that forgot which way was out.',power:28,coins:50,loot:{dust:2,essence:.3}},
      {name:'Stonebound Guard',icon:'🗿',level:35,desc:'A carved sentinel with a cracked crown.',power:48,coins:90,loot:{crystals:2,bones:5,essence:.6}},
      {name:'Rift Devourer',icon:'🐉',level:50,desc:'A hungry shape at the edge of reality.',power:80,coins:180,loot:{crystals:5,runes:2,essence:2}}
    ],
    BOSSES: [
      {floor:5,name:'The Gatekeeper',icon:'🗿',hp:400,desc:'A stone giant chained to the first gate.',reward:{coins:180,essence:2,crystals:2},weakness:'Mining',title:'Gatebreaker'},
      {floor:10,name:'Cinder Matriarch',icon:'🔥',hp:1400,desc:'The ancient flame that keeps the lower crypt warm.',reward:{coins:650,essence:7,ingots:8},weakness:'Woodcutting',title:'Flame-tamer'},
      {floor:15,name:'The Hollow Knight',icon:'⚔',hp:4500,desc:'An empty suit of armor that remembers every battle.',reward:{coins:1800,essence:18,runes:6},weakness:'Smithing',title:'Hollow-slayer'},
      {floor:20,name:'Oracle of the Rift',icon:'🌀',hp:12000,desc:'A watcher from beyond the last stable star.',reward:{coins:6000,essence:45,crystals:12},weakness:'Runecraft',title:'Rift-walker'},
      {floor:25,name:'The Deep King',icon:'👑',hp:40000,desc:'The first ruler of the world beneath the world.',reward:{coins:18000,essence:120,runes:18},weakness:'Combat',title:'Deep King’s Bane'},
      {floor:30,name:'The Iron Maw',icon:'🦷',hp:85000,desc:'A walking furnace that consumes discarded weapons and spits out slag.',reward:{coins:36000,essence:220,ingots:35,ore:80},weakness:'Mining',title:'Maw-breaker'},
      {floor:35,name:'Witch of the Green Flame',icon:'🧙',hp:160000,desc:'The last keeper of the forest fire, now twisted by the deep.',reward:{coins:65000,essence:340,herbs:90,dust:35},weakness:'Foraging',title:'Greenfire Bane'},
      {floor:40,name:'The Starved Colossus',icon:'🗿',hp:300000,desc:'An ancient giant that has been eating its own stone heart.',reward:{coins:110000,essence:500,crystals:55,bones:120},weakness:'Smithing',title:'Colossus-breaker'},
      {floor:45,name:'The Lantern Below',icon:'🏮',hp:520000,desc:'A floating light that leads explorers away from the surface forever.',reward:{coins:180000,essence:750,runes:45,research:120},weakness:'Alchemy',title:'Light-returner'},
      {floor:50,name:'The World-Eater',icon:'🐉',hp:900000,desc:'A hungry rift-drake said to have swallowed the first stars.',reward:{coins:300000,essence:1200,crystals:100,runes:80},weakness:'Runecraft',title:'World-saver'}
    ],
    ZONES:[
      {id:'keep',name:'Emberkeep Outskirts',icon:'🏰',floor:1,desc:'A battered fort beneath a slate-grey sky. Start here, grow here.',unlock:0},
      {id:'moss',name:'Mossbound Passage',icon:'🌿',floor:3,desc:'Roots have pushed through the ancient brickwork.',unlock:3},
      {id:'cinder',name:'Cinderworks',icon:'🔥',floor:6,desc:'Abandoned forges still glow behind sealed gates.',unlock:6},
      {id:'prism',name:'Prism Caverns',icon:'💎',floor:11,desc:'Crystal growths refract the torchlight into strange colors.',unlock:11},
      {id:'rift',name:'The Broken Veil',icon:'🌀',floor:16,desc:'Reality has split into floating stone fragments.',unlock:16},
      {id:'deep',name:'Throne of the Deep',icon:'👑',floor:21,desc:'The oldest chamber, untouched by surface time.',unlock:21},
      {id:'ashen',name:'Ashen Battlements',icon:'🏯',floor:26,desc:'A fortress turned to cinders by a fire that never went out.',unlock:26},
      {id:'starfall',name:'Starfall Vault',icon:'☄',floor:31,desc:'Fragments of a fallen sky are buried inside the stone.',unlock:31},
      {id:'wildroot',name:'Wildroot Sanctum',icon:'🌳',floor:36,desc:'Ancient roots curl around a forgotten shrine.',unlock:36},
      {id:'lantern',name:'The Lantern Below',icon:'🏮',floor:41,desc:'A pale light hangs over an endless staircase.',unlock:41},
      {id:'worldend',name:'World-End Gate',icon:'🐉',floor:46,desc:'The final known door hums with the sound of distant stars.',unlock:46}
    ],
    QUESTS:[
      {id:'firstSteps',name:'A Wayfarer’s Work',icon:'📜',desc:'Reach level 3 in any skill.',goal:3,metric:'bestSkill',reward:{coins:80,ore:12,research:5},hint:'Train any skill until it reaches level 3.'},
      {id:'gatherer',name:'A Full Pack',icon:'🎒',desc:'Collect 100 total gathering materials.',goal:100,metric:'gathered',reward:{coins:150,wood:25,ore:25},hint:'Gather ore, timber, fish, and herbs.'},
      {id:'theForge',name:'Strike While Hot',icon:'⚒',desc:'Produce 10 ingots.',goal:10,metric:'ingotsMade',reward:{coins:220,research:12,crystals:2},hint:'Run the Smelt Copper activity or craft ingots.'},
      {id:'firstBlood',name:'Not So Scary',icon:'⚔',desc:'Defeat 25 monsters.',goal:25,metric:'kills',reward:{coins:200,bones:15,hides:10},hint:'Assign Combat or enable an idle dungeon run.'},
      {id:'deepDelver',name:'Into the Deep',icon:'🗝',desc:'Reach dungeon floor 5.',goal:5,metric:'floor',reward:{coins:300,essence:3,runes:2},hint:'Open Dungeons and start a run.'},
      {id:'lorekeeper',name:'A Little More Curious',icon:'⌬',desc:'Purchase 3 research upgrades.',goal:3,metric:'researchBuys',reward:{coins:350,crystals:6,essence:4},hint:'Earn Research from the lab and crafting, then buy upgrades.'},
      {id:'artisan',name:'The Artisan',icon:'🏆',desc:'Craft 5 different pieces of equipment.',goal:5,metric:'uniqueCrafts',reward:{coins:800,essence:8,research:30},hint:'Collect materials and craft recipes in Equipment.'},
      {id:'ascendant',name:'A New Beginning',icon:'✧',desc:'Perform your first Ascension.',goal:1,metric:'ascensions',reward:{coins:1000,essence:12,crystals:10},hint:'Reach the required levels and dungeon floor, then ascend from Overview.'},
      {id:'cartographer',name:'Keeper of the Map',icon:'🗺',desc:'Discover 10 frontier sectors.',goal:10,metric:'sectors',reward:{coins:700,research:25,crystals:5},hint:'Explore outward from neighboring tiles on the World Map.'},
      {id:'settler',name:'Foundations in the Dark',icon:'🏗',desc:'Build 3 structures on the frontier.',goal:3,metric:'worldBuildings',reward:{coins:500,wood:40,ore:30},hint:'Explore suitable terrain and construct production buildings.'}
    ],
    ACHIEVEMENTS:[
      {id:'oneSkill',name:'Just Getting Started',desc:'Reach level 10 in one skill.',metric:'bestSkill',goal:10,reward:{coins:100}},
      {id:'allRounder',name:'A Bit of Everything',desc:'Reach level 5 in six skills.',metric:'skillsAt5',goal:6,reward:{research:20}},
      {id:'slayer',name:'Monster Problem',desc:'Defeat 100 monsters.',metric:'kills',goal:100,reward:{essence:5}},
      {id:'collector',name:'Hoarder of Helpful Things',desc:'Own 500 total resources.',metric:'ownedResources',goal:500,reward:{coins:1000}},
      {id:'delver',name:'No Turning Back',desc:'Reach floor 10.',metric:'floor',goal:10,reward:{crystals:8}},
      {id:'bossOne',name:'Gate Unsealed',desc:'Defeat a dungeon boss.',metric:'bosses',goal:1,reward:{essence:10}},
      {id:'researcher',name:'Academic Menace',desc:'Buy five research ranks.',metric:'researchRanks',goal:5,reward:{research:100}},
      {id:'ascendTwice',name:'Cycle of Embers',desc:'Ascend twice.',metric:'ascensions',goal:2,reward:{essence:30}},
      {id:'mapmaker',name:'Every Corner Has a Story',desc:'Discover 20 frontier sectors.',metric:'sectors',goal:20,reward:{research:50}},
      {id:'builder',name:'A Small Empire',desc:'Build 8 frontier structures.',metric:'worldBuildings',goal:8,reward:{essence:8,coins:4000}}
    ]
  };
  window.PIXELIX_DATA = D;
})();
