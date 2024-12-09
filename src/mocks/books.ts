export interface I_Books {
  id:number,
  title:string,
  author:string,
  plot:string,
  publicationYear:number,
  publisher:string,
  price:number,
}

const BOOKS: I_Books[] = [
  {
    "id": 1,
    "title": "Shadows of the Fallen",
    "author": "Megan Grant",
    "plot": "A dystopian thriller following a group of rebels who uncover a dark conspiracy that could bring down the corrupt regime controlling their society.",
    "publicationYear": 2021,
    "publisher": "Rebel Press",
    "price": 23000
  },
  {
    "id": 2,
    "title": "The Phoenix Rises",
    "author": "David Collins",
    "plot": "In a world where magic is forbidden, a young outcast discovers that she holds the key to unleashing a long-forgotten power that could change the world.",
    "publicationYear": 2020,
    "publisher": "Ember Books",
    "price": 25000
  },
  {
    "id": 3,
    "title": "Crimson Sky",
    "author": "Grace Miller",
    "plot": "A story of love, sacrifice, and betrayal in a high-stakes sky pirate world where a crew of renegades seeks redemption for their dark pasts.",
    "publicationYear": 2022,
    "publisher": "Skyline Press",
    "price": 22000
  },
  {
    "id": 4,
    "title": "Echoes of the Past",
    "author": "Rachel Dawson",
    "plot": "A woman investigates her family's mysterious history and uncovers dark secrets that lead her to confront powerful enemies from her past.",
    "publicationYear": 2019,
    "publisher": "Legacy Publishing",
    "price": 24000
  },
  {
    "id": 5,
    "title": "The Secret Kingdom",
    "author": "Hannah Evans",
    "plot": "A young prince must reclaim his throne from a usurper, guided by an ancient prophecy and his loyal companions, in this epic fantasy tale.",
    "publicationYear": 2020,
    "publisher": "Royal Press",
    "price": 28000
  },
  {
    "id": 6,
    "title": "The Last Horizon",
    "author": "Sebastian Grant",
    "plot": "An astronaut on the last mission to explore the outer edges of the galaxy must face the unknown dangers lurking beyond the stars.",
    "publicationYear": 2023,
    "publisher": "Starfall Books",
    "price": 26000
  },
  {
    "id": 7,
    "title": "Beneath the Surface",
    "author": "Lauren Scott",
    "plot": "A gripping underwater thriller where a marine archaeologist discovers the remains of an ancient civilization, but something dangerous lurks beneath.",
    "publicationYear": 2021,
    "publisher": "Deep Blue Publishing",
    "price": 24000
  },
  {
    "id": 8,
    "title": "The Forgotten City",
    "author": "Peter Black",
    "plot": "A young historian stumbles upon a long-lost city, filled with powerful artifacts, ancient traps, and an immortal enemy that seeks to protect its secrets.",
    "publicationYear": 2022,
    "publisher": "Ancient World Press",
    "price": 25000
  },
  {
    "id": 9,
    "title": "The Fire Keeper",
    "author": "Lily Walters",
    "plot": "In a world where fire magic is forbidden, a young woman discovers she is the last living fire keeper, destined to restore balance to a shattered kingdom.",
    "publicationYear": 2020,
    "publisher": "Blaze Books",
    "price": 22000
  },
  {
    "id": 10,
    "title": "Waves of Destiny",
    "author": "Connor Wright",
    "plot": "A gripping nautical adventure where a ship captain and his crew must survive a deadly storm, uncover a pirate treasure, and outwit a mysterious force.",
    "publicationYear": 2021,
    "publisher": "Ocean Press",
    "price": 23000
  },
  {
    "id": 11,
    "title": "The Stolen Crown",
    "author": "Eleanor Turner",
    "plot": "A medieval fantasy novel about a princess who must reclaim her stolen crown and save her kingdom from a sinister plot to overthrow her family.",
    "publicationYear": 2019,
    "publisher": "Royal Press",
    "price": 24000
  },
  {
    "id": 12,
    "title": "Into the Abyss",
    "author": "Travis Young",
    "plot": "A deep-sea exploration crew uncovers the secrets of a sunken civilization, only to discover that their discovery may be the end of humanity itself.",
    "publicationYear": 2020,
    "publisher": "Abyssal Books",
    "price": 27000
  },
  {
    "id": 13,
    "title": "The Shadow's Veil",
    "author": "Isabelle James",
    "plot": "A fantasy mystery where a young woman must use her hidden powers to uncover a dark conspiracy and protect the kingdom from an ancient threat.",
    "publicationYear": 2022,
    "publisher": "Mystic Press",
    "price": 26000
  },
  {
    "id": 14,
    "title": "The Seeker's Journey",
    "author": "Edward Price",
    "plot": "A young adventurer embarks on a quest to find a legendary artifact that can change the fate of the world, but dark forces are determined to stop him.",
    "publicationYear": 2021,
    "publisher": "Epic Quest Books",
    "price": 24000
  },
  {
    "id": 15,
    "title": "Secrets of the Forest",
    "author": "Maya King",
    "plot": "A mysterious forest holds the key to an ancient power, and a young girl must uncover its secrets to save her people from a destructive war.",
    "publicationYear": 2019,
    "publisher": "Enchanted Press",
    "price": 23000
  },
  {
    "id": 16,
    "title": "The Midnight Watch",
    "author": "Marcus Hill",
    "plot": "A supernatural detective story where a lone investigator hunts down restless spirits haunting an ancient mansion on the edge of the city.",
    "publicationYear": 2022,
    "publisher": "Ghostly Press",
    "price": 25000
  },
  {
    "id": 17,
    "title": "The Blade of Eternity",
    "author": "Jason Carter",
    "plot": "A historical fantasy where a legendary blade holds the power to change the course of history, and a group of warriors must prevent its misuse.",
    "publicationYear": 2023,
    "publisher": "Eternal Blades Publishing",
    "price": 27000
  },
  {
    "id": 18,
    "title": "Uncharted Waters",
    "author": "Natalie Brooks",
    "plot": "A thrilling adventure of a sailor who discovers a map to an uncharted island that may hold the key to an ancient treasure, but danger lurks at every turn.",
    "publicationYear": 2021,
    "publisher": "Blue Horizon Press",
    "price": 24000
  },
  {
    "id": 19,
    "title": "The Night Thief",
    "author": "Henry Stone",
    "plot": "A gripping crime novel where a notorious thief pulls off a heist that could ruin the lives of everyone involved, but a detective is hot on his trail.",
    "publicationYear": 2020,
    "publisher": "Shadow Books",
    "price": 22000
  },
  {
    "id": 20,
    "title": "Embers of Hope",
    "author": "Sophia Harris",
    "plot": "In a world ravaged by war, a group of survivors must find the courage to fight for a better future and reignite the flames of hope.",
    "publicationYear": 2023,
    "publisher": "Hope Publishing",
    "price": 26000
  }
];



export default BOOKS
