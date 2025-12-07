const { getDb } = require("../assets/database/MongoDB");
const mongoClient = require("../assets/database/MongoDB").mongoConnect;

const books = [
  { title: 'The Silent Library', author: 'Aisha Thompson', year: 2001, status: 'available' },
  { title: 'Shadows of Knowledge', author: 'Daniel Harper', year: 1998, status: 'available' },
  { title: 'The Lost Manuscript', author: 'Sarah Mitchell', year: 2010, status: 'available' },
  { title: 'Whispers Between Shelves', author: 'Jonathan Brooks', year: 2005, status: 'available' },
  { title: 'The Lantern Keeper', author: 'Emily Carter', year: 2013, status: 'available' },
  { title: 'A World of Pages', author: 'Michael Reed', year: 1999, status: 'available' },
  { title: 'Letters to the Future', author: 'Nora Blake', year: 2021, status: 'available' },
  { title: 'Beyond the Ink', author: 'Samuel Hayes', year: 2018, status: 'available' },
  { title: 'The Forgotten Author', author: 'Claire Jennings', year: 2004, status: 'available' },
  { title: 'Echoes of Literature', author: 'Liam Foster', year: 2015, status: 'available' },
  { title: 'The Last Chapter House', author: 'Olivia Bennett', year: 1996, status: 'available' },
  { title: 'Words in the Wind', author: 'Ethan Miller', year: 2011, status: 'available' },
  { title: 'The Hidden Archive', author: 'Michelle Gray', year: 2008, status: 'available' },
  { title: 'Pages of Destiny', author: 'Robert Kingston', year: 2002, status: 'available' },
  { title: 'The Chronicle Gate', author: 'Hannah Lewis', year: 2017, status: 'available' },
  { title: 'Book of the Blue Moon', author: 'David Collins', year: 1993, status: 'available' },
  { title: 'The Paper Horizon', author: 'Jessica Dawn', year: 2020, status: 'available' },
  { title: 'The Librarian\'s Key', author: 'Andrew Knight', year: 2007, status: 'available' },
  { title: 'The Story Vault', author: 'Naomi Walters', year: 2019, status: 'available' },
  { title: 'The Fountain of Tales', author: 'Chris Walker', year: 1997, status: 'available' },
  { title: 'The Inkbound Adventure', author: 'Sophia Carter', year: 2012, status: 'available' },
  { title: 'Memoirs of the Old Oak', author: 'Henry Wallace', year: 1995, status: 'available' },
  { title: 'Realm of Forgotten Stories', author: 'Monica Riley', year: 2014, status: 'available' },
  { title: 'The Library Clock', author: 'Kevin Brooks', year: 2022, status: 'available' },
  { title: 'Pages of the Past', author: 'Linda Morgan', year: 2003, status: 'available' },
  { title: 'The Phoenix Manuscript', author: 'Lucas Grant', year: 2016, status: 'available' },
  { title: 'The Scholar\'s Compass', author: 'Alice Rhodes', year: 1992, status: 'available' },
  { title: 'A Tale for Tomorrow', author: 'George Sinclair', year: 2011, status: 'available' },
  { title: 'The Emerald Shelf', author: 'Rita Daniels', year: 2009, status: 'available' },
  { title: 'Whispering Pages', author: 'Noel Carter', year: 1990, status: 'available' },
  { title: 'The Ink of Hope', author: 'Brian Matthews', year: 2006, status: 'available' },
  { title: 'The Golden Bookmark', author: 'Julie Hudson', year: 2013, status: 'available' },
  { title: 'Chronicle of Two Worlds', author: 'Mark Preston', year: 1994, status: 'available' },
  { title: 'The Last Librarian', author: 'Emma Webster', year: 2018, status: 'available' },
  { title: 'Sands of Imagination', author: 'Noah Clarke', year: 2001, status: 'available' },
  { title: 'A Book of Dreams', author: 'Kelly Roberts', year: 2010, status: 'available' },
  { title: 'Threads of Wisdom', author: 'Jason Moore', year: 2017, status: 'available' },
  { title: 'The Hidden Index', author: 'Patricia Wynn', year: 2004, status: 'available' },
  { title: 'The Collector of Stories', author: 'Ian Barnes', year: 2023, status: 'available' },
  { title: 'The Eternal Library', author: 'Grace Hamilton', year: 1999, status: 'available' },
  { title: 'The Hollow Notebook', author: 'William Hunt', year: 2008, status: 'available' },
  { title: 'Fire and Ink', author: 'Diana Parker', year: 2015, status: 'available' },
  { title: 'The Celestial Codex', author: 'Marcus Hale', year: 1991, status: 'available' },
  { title: 'The Book of Seven Doors', author: 'Lily Marshall', year: 2014, status: 'available' },
  { title: 'Leaves of Imagination', author: 'Ryan Mitchell', year: 2007, status: 'available' },
  { title: 'The Midnight Archivist', author: 'Olivia Stone', year: 2021, status: 'available' },
  { title: 'The Ink Weaver', author: 'Nathan Cross', year: 2012, status: 'available' },
  { title: 'The Endless Shelf', author: 'Tara Holland', year: 2019, status: 'available' },
  { title: 'Beyond the Cover', author: 'Zachary Hill', year: 1996, status: 'available' },
  { title: 'The Bookmaker\'s Secret', author: 'Chloe Adams', year: 2018, status: 'available' },
  { title: 'The Library of Echoes', author: 'Frank Lewis', year: 2000, status: 'available' },
  { title: 'Storykeepers', author: 'Abigail Moore', year: 2005, status: 'available' },
  { title: 'The Wandering Quill', author: 'Trevor Mills', year: 2003, status: 'available' },
  { title: 'The Tale Collector', author: 'Daisy Carter', year: 2022, status: 'available' },
  { title: 'The Timewritten Scroll', author: 'Richard Pierce', year: 1998, status: 'available' },
  { title: 'The Lighthouse Reader', author: 'Amanda Wells', year: 2010, status: 'available' },
  { title: 'Words of the Ancients', author: 'Connor Blake', year: 1994, status: 'available' },
  { title: 'The Forgotten Chapters', author: 'Alice Foster', year: 2009, status: 'available' },
  { title: 'Journey Through the Margins', author: 'Eric Howard', year: 2016, status: 'available' },
  { title: 'The Whispered Chronicle', author: 'Megan Scott', year: 2021, status: 'available' },
  { title: 'The Memory Library', author: 'Oscar Hill', year: 2013, status: 'available' },
  { title: 'The Silent Index', author: 'Mary Wilson', year: 2018, status: 'available' },
  { title: 'The Bound Book', author: 'Tyler Collins', year: 2016, status: 'available' },
  { title: 'The Ancient Reader', author: 'Victoria Lane', year: 2021, status: 'available' },
  { title: 'The Paper Trail', author: 'Adam Ford', year: 2004, status: 'available' },
  { title: 'The Island of Stories', author: 'Maggie Lopez', year: 2007, status: 'available' },
  { title: 'The Celestial Reader', author: 'Philip George', year: 1997, status: 'available' },
  { title: 'The Whispering Ink', author: 'Zoe Richardson', year: 2019, status: 'available' },
  { title: 'The Night Library', author: 'Kyle Bryant', year: 2001, status: 'available' },
  { title: 'The Enchanted Manuscript', author: 'Eliza Moore', year: 2015, status: 'available' },
  { title: 'The Storyteller\'s Legacy', author: 'Patrick Stone', year: 2010, status: 'available' },
  { title: 'The Script of Time', author: 'Helen Carter', year: 1992, status: 'available' },
  { title: 'The Vault of Words', author: 'Darren Walsh', year: 2012, status: 'available' },
  { title: 'The Lost Chronicle', author: 'Kimberly Dale', year: 2020, status: 'available' },
  { title: 'Letters of the Dawn', author: 'Felix Monroe', year: 2008, status: 'available' },
  { title: 'The Writer\'s Gate', author: 'Sarah Lowe', year: 2017, status: 'available' },
  { title: 'The Past Remembered', author: 'Andrew Stone', year: 1996, status: 'available' },
  { title: 'The Golden Scroll', author: 'Maria Torres', year: 2011, status: 'available' },
  { title: 'The Forgotten Codex', author: 'Sean Miller', year: 2003, status: 'available' },
  { title: 'The Book of Sand', author: 'Trisha Patel', year: 2022, status: 'available' },
  { title: 'The Ink Road', author: 'Daniel Ray', year: 2006, status: 'available' },
  { title: 'The Light Between Pages', author: 'Olivia Roberts', year: 2014, status: 'available' },
  { title: 'The Story Forest', author: 'Emily Cooper', year: 1991, status: 'available' },
  { title: 'The Midnight Pages', author: 'Henry Drake', year: 2018, status: 'available' },
  { title: 'The Tale of the Silver Feather', author: 'Laura Griffin', year: 2002, status: 'available' },
  { title: 'The Chronicle Path', author: 'Benjamin Parker', year: 2021, status: 'available' },
  { title: 'Atlas of Lost Stories', author: 'Mia Clarke', year: 2005, status: 'available' },
  { title: 'The Inkstorm', author: 'Ryan Blake', year: 2013, status: 'available' },
  { title: 'Pages of the Cosmos', author: 'Julia Adams', year: 2024, status: 'available' },
  { title: 'The Keeper of Books', author: 'Noah Lewis', year: 1998, status: 'available' },
  { title: 'The Realm of Pages', author: 'Irene Barnes', year: 2007, status: 'available' },
  { title: 'The Line of Memory', author: 'Joseph Turner', year: 2019, status: 'available' },
  { title: 'The Lantern Book', author: 'Nancy Oliver', year: 2001, status: 'available' },
  { title: 'A Garden of Stories', author: 'Mark Nelson', year: 2016, status: 'available' },
  { title: 'The Golden Reader', author: 'Ellie Howard', year: 1995, status: 'available' },
  { title: 'Journey Through Chapters', author: 'Samuel Reid', year: 2010, status: 'available' },
  { title: 'Tales of the Hidden Valley', author: 'Grace Wilson', year: 2009, status: 'available' },
  { title: 'The Writer\'s Haven', author: 'Adam Scott', year: 2017, status: 'available' },
  { title: 'The Everlasting Index', author: 'Chloe Knight', year: 2011, status: 'available' },
  { title: 'The Sunlit Manuscript', author: 'Victor Harper', year: 2003, status: 'available' }
];

function seedBooks() {
  mongoClient(async () => {
    try {
      const db = getDb();
      const collection = db.collection("books");
      
      // Check if books already exist
      const existingBooks = await collection.countDocuments();
      if (existingBooks > 0) {
        console.log(`Database already has ${existingBooks} books.`);
        console.log('Adding new books that don\'t already exist...');
        
        // Insert only books that don't exist (based on title and author)
        const existingTitles = await collection.find({}, { projection: { title: 1, author: 1 } }).toArray();
        const existingKeys = new Set(existingTitles.map(b => `${b.title}|${b.author}`));
        const newBooks = books.filter(b => !existingKeys.has(`${b.title}|${b.author}`));
        
        if (newBooks.length > 0) {
          const result = await collection.insertMany(newBooks);
          console.log(`Successfully inserted ${result.insertedCount} new books into the database!`);
        } else {
          console.log('All books from the seed file already exist in the database.');
        }
      } else {
        // Insert all books
        const result = await collection.insertMany(books);
        console.log(`Successfully inserted ${result.insertedCount} books into the database!`);
      }
      
      console.log('Books are now available in the Browse Books section.');
      process.exit(0);
    } catch (error) {
      console.error('Error seeding books:', error);
      process.exit(1);
    }
  });
}

seedBooks();

