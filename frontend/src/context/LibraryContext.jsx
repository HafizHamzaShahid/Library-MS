import { createContext, useContext, useMemo, useState } from 'react'
import PropTypes from 'prop-types'

const LibraryContext = createContext(null)

const initialBooks = [
  { id: 'b1', title: 'The Silent Library', author: 'Aisha Thompson', year: 2001, status: 'available' },
  { id: 'b2', title: 'Shadows of Knowledge', author: 'Daniel Harper', year: 1998, status: 'available' },
  { id: 'b3', title: 'The Lost Manuscript', author: 'Sarah Mitchell', year: 2010, status: 'available' },
  { id: 'b4', title: 'Whispers Between Shelves', author: 'Jonathan Brooks', year: 2005, status: 'available' },
  { id: 'b5', title: 'The Lantern Keeper', author: 'Emily Carter', year: 2013, status: 'available' },
  { id: 'b6', title: 'A World of Pages', author: 'Michael Reed', year: 1999, status: 'available' },
  { id: 'b7', title: 'Letters to the Future', author: 'Nora Blake', year: 2021, status: 'available' },
  { id: 'b8', title: 'Beyond the Ink', author: 'Samuel Hayes', year: 2018, status: 'available' },
  { id: 'b9', title: 'The Forgotten Author', author: 'Claire Jennings', year: 2004, status: 'available' },
  { id: 'b10', title: 'Echoes of Literature', author: 'Liam Foster', year: 2015, status: 'available' },
  { id: 'b11', title: 'The Last Chapter House', author: 'Olivia Bennett', year: 1996, status: 'available' },
  { id: 'b12', title: 'Words in the Wind', author: 'Ethan Miller', year: 2011, status: 'available' },
  { id: 'b13', title: 'The Hidden Archive', author: 'Michelle Gray', year: 2008, status: 'available' },
  { id: 'b14', title: 'Pages of Destiny', author: 'Robert Kingston', year: 2002, status: 'available' },
  { id: 'b15', title: 'The Chronicle Gate', author: 'Hannah Lewis', year: 2017, status: 'available' },
  { id: 'b16', title: 'Book of the Blue Moon', author: 'David Collins', year: 1993, status: 'available' },
  { id: 'b17', title: 'The Paper Horizon', author: 'Jessica Dawn', year: 2020, status: 'available' },
  { id: 'b18', title: 'The Librarian’s Key', author: 'Andrew Knight', year: 2007, status: 'available' },
  { id: 'b19', title: 'The Story Vault', author: 'Naomi Walters', year: 2019, status: 'available' },
  { id: 'b20', title: 'The Fountain of Tales', author: 'Chris Walker', year: 1997, status: 'available' },

  // 21–40
  { id: 'b21', title: 'The Inkbound Adventure', author: 'Sophia Carter', year: 2012, status: 'available' },
  { id: 'b22', title: 'Memoirs of the Old Oak', author: 'Henry Wallace', year: 1995, status: 'available' },
  { id: 'b23', title: 'Realm of Forgotten Stories', author: 'Monica Riley', year: 2014, status: 'available' },
  { id: 'b24', title: 'The Library Clock', author: 'Kevin Brooks', year: 2022, status: 'available' },
  { id: 'b25', title: 'Pages of the Past', author: 'Linda Morgan', year: 2003, status: 'available' },
  { id: 'b26', title: 'The Phoenix Manuscript', author: 'Lucas Grant', year: 2016, status: 'available' },
  { id: 'b27', title: 'The Scholar’s Compass', author: 'Alice Rhodes', year: 1992, status: 'available' },
  { id: 'b28', title: 'A Tale for Tomorrow', author: 'George Sinclair', year: 2011, status: 'available' },
  { id: 'b29', title: 'The Emerald Shelf', author: 'Rita Daniels', year: 2009, status: 'available' },
  { id: 'b30', title: 'Whispering Pages', author: 'Noel Carter', year: 1990, status: 'available' },
  { id: 'b31', title: 'The Ink of Hope', author: 'Brian Matthews', year: 2006, status: 'available' },
  { id: 'b32', title: 'The Golden Bookmark', author: 'Julie Hudson', year: 2013, status: 'available' },
  { id: 'b33', title: 'Chronicle of Two Worlds', author: 'Mark Preston', year: 1994, status: 'available' },
  { id: 'b34', title: 'The Last Librarian', author: 'Emma Webster', year: 2018, status: 'available' },
  { id: 'b35', title: 'Sands of Imagination', author: 'Noah Clarke', year: 2001, status: 'available' },
  { id: 'b36', title: 'A Book of Dreams', author: 'Kelly Roberts', year: 2010, status: 'available' },
  { id: 'b37', title: 'Threads of Wisdom', author: 'Jason Moore', year: 2017, status: 'available' },
  { id: 'b38', title: 'The Hidden Index', author: 'Patricia Wynn', year: 2004, status: 'available' },
  { id: 'b39', title: 'The Collector of Stories', author: 'Ian Barnes', year: 2023, status: 'available' },
  { id: 'b40', title: 'The Eternal Library', author: 'Grace Hamilton', year: 1999, status: 'available' },

  // 41–60
  { id: 'b41', title: 'The Hollow Notebook', author: 'William Hunt', year: 2008, status: 'available' },
  { id: 'b42', title: 'Fire and Ink', author: 'Diana Parker', year: 2015, status: 'available' },
  { id: 'b43', title: 'The Celestial Codex', author: 'Marcus Hale', year: 1991, status: 'available' },
  { id: 'b44', title: 'The Book of Seven Doors', author: 'Lily Marshall', year: 2014, status: 'available' },
  { id: 'b45', title: 'Leaves of Imagination', author: 'Ryan Mitchell', year: 2007, status: 'available' },
  { id: 'b46', title: 'The Midnight Archivist', author: 'Olivia Stone', year: 2021, status: 'available' },
  { id: 'b47', title: 'The Ink Weaver', author: 'Nathan Cross', year: 2012, status: 'available' },
  { id: 'b48', title: 'The Endless Shelf', author: 'Tara Holland', year: 2019, status: 'available' },
  { id: 'b49', title: 'Beyond the Cover', author: 'Zachary Hill', year: 1996, status: 'available' },
  { id: 'b50', title: 'The Bookmaker’s Secret', author: 'Chloe Adams', year: 2018, status: 'available' },
  { id: 'b51', title: 'The Library of Echoes', author: 'Frank Lewis', year: 2000, status: 'available' },
  { id: 'b52', title: 'Storykeepers', author: 'Abigail Moore', year: 2005, status: 'available' },
  { id: 'b53', title: 'The Wandering Quill', author: 'Trevor Mills', year: 2003, status: 'available' },
  { id: 'b54', title: 'The Tale Collector', author: 'Daisy Carter', year: 2022, status: 'available' },
  { id: 'b55', title: 'The Timewritten Scroll', author: 'Richard Pierce', year: 1998, status: 'available' },
  { id: 'b56', title: 'The Lighthouse Reader', author: 'Amanda Wells', year: 2010, status: 'available' },
  { id: 'b57', title: 'Words of the Ancients', author: 'Connor Blake', year: 1994, status: 'available' },
  { id: 'b58', title: 'The Forgotten Chapters', author: 'Alice Foster', year: 2009, status: 'available' },
  { id: 'b59', title: 'Journey Through the Margins', author: 'Eric Howard', year: 2016, status: 'available' },
  { id: 'b60', title: 'The Whispered Chronicle', author: 'Megan Scott', year: 2021, status: 'available' },

  // 61–80
  { id: 'b61', title: 'The Archive of Stars', author: 'Peter Daniels', year: 2017, status: 'available' },
  { id: 'b62', title: 'The Paper Kingdom', author: 'Sandra Myers', year: 2012, status: 'available' },
  { id: 'b63', title: 'The Boundless Story', author: 'Christopher Lane', year: 2006, status: 'available' },
  { id: 'b64', title: 'Inkfall', author: 'Rebecca Knight', year: 2020, status: 'available' },
  { id: 'b65', title: 'The Memory Pages', author: 'Nathan Hayes', year: 2001, status: 'available' },
  { id: 'b66', title: 'The Clouded Chronicle', author: 'Lauren Fisher', year: 2014, status: 'available' },
  { id: 'b67', title: 'A Shelf of Secrets', author: 'Victor Adams', year: 1993, status: 'available' },
  { id: 'b68', title: 'The Wand of Words', author: 'Holly Carter', year: 2018, status: 'available' },
  { id: 'b69', title: 'The Mark of the Reader', author: 'John Cooper', year: 2007, status: 'available' },
  { id: 'b70', title: 'The Story Maze', author: 'Sylvia Turner', year: 2019, status: 'available' },
  { id: 'b71', title: 'The Last Bookmark', author: 'Ethan Graham', year: 1995, status: 'available' },
  { id: 'b72', title: 'The Pearl Library', author: 'Madison Lee', year: 2016, status: 'available' },
  { id: 'b73', title: 'A Tale of Two Shelves', author: 'Joel Parker', year: 2003, status: 'available' },
  { id: 'b74', title: 'The Scripted Voyage', author: 'Ivy Simmons', year: 2011, status: 'available' },
  { id: 'b75', title: 'Written Whispers', author: 'Aaron Stevens', year: 2008, status: 'available' },
  { id: 'b76', title: 'Book of the Wanderers', author: 'Caroline Woods', year: 1999, status: 'available' },
  { id: 'b77', title: 'The Scarlet Archive', author: 'Logan Stewart', year: 2023, status: 'available' },
  { id: 'b78', title: 'Pages of Light', author: 'Evelyn Brooks', year: 2002, status: 'available' },
  { id: 'b79', title: 'The Winter Quill', author: 'Patrick O\'Donnell', year: 2005, status: 'available' },
  { id: 'b80', title: 'Chronicle of the Sea', author: 'Linda Hansen', year: 1990, status: 'available' },

  // 81–100
  { id: 'b81', title: 'The Memory Library', author: 'Oscar Hill', year: 2013, status: 'available' },
  { id: 'b82', title: 'The Silent Index', author: 'Mary Wilson', year: 2018, status: 'available' },
  { id: 'b83', title: 'The Bound Book', author: 'Tyler Collins', year: 2016, status: 'available' },
  { id: 'b84', title: 'The Ancient Reader', author: 'Victoria Lane', year: 2021, status: 'available' },
  { id: 'b85', title: 'The Paper Trail', author: 'Adam Ford', year: 2004, status: 'available' },
  { id: 'b86', title: 'The Island of Stories', author: 'Maggie Lopez', year: 2007, status: 'available' },
  { id: 'b87', title: 'The Celestial Reader', author: 'Philip George', year: 1997, status: 'available' },
  { id: 'b88', title: 'The Whispering Ink', author: 'Zoe Richardson', year: 2019, status: 'available' },
  { id: 'b89', title: 'The Night Library', author: 'Kyle Bryant', year: 2001, status: 'available' },
  { id: 'b90', title: 'The Enchanted Manuscript', author: 'Eliza Moore', year: 2015, status: 'available' },
  { id: 'b91', title: 'The Storyteller’s Legacy', author: 'Patrick Stone', year: 2010, status: 'available' },
  { id: 'b92', title: 'The Script of Time', author: 'Helen Carter', year: 1992, status: 'available' },
  { id: 'b93', title: 'The Vault of Words', author: 'Darren Walsh', year: 2012, status: 'available' },
  { id: 'b94', title: 'The Lost Chronicle', author: 'Kimberly Dale', year: 2020, status: 'available' },
  { id: 'b95', title: 'Letters of the Dawn', author: 'Felix Monroe', year: 2008, status: 'available' },
  { id: 'b96', title: 'The Writer’s Gate', author: 'Sarah Lowe', year: 2017, status: 'available' },
  { id: 'b97', title: 'The Past Remembered', author: 'Andrew Stone', year: 1996, status: 'available' },
  { id: 'b98', title: 'The Golden Scroll', author: 'Maria Torres', year: 2011, status: 'available' },
  { id: 'b99', title: 'The Forgotten Codex', author: 'Sean Miller', year: 2003, status: 'available' },
  { id: 'b100', title: 'The Book of Sand', author: 'Trisha Patel', year: 2022, status: 'available' },

  // 101–120
  { id: 'b101', title: 'The Ink Road', author: 'Daniel Ray', year: 2006, status: 'available' },
  { id: 'b102', title: 'The Light Between Pages', author: 'Olivia Roberts', year: 2014, status: 'available' },
  { id: 'b103', title: 'The Story Forest', author: 'Emily Cooper', year: 1991, status: 'available' },
  { id: 'b104', title: 'The Midnight Pages', author: 'Henry Drake', year: 2018, status: 'available' },
  { id: 'b105', title: 'The Tale of the Silver Feather', author: 'Laura Griffin', year: 2002, status: 'available' },
  { id: 'b106', title: 'The Chronicle Path', author: 'Benjamin Parker', year: 2021, status: 'available' },
  { id: 'b107', title: 'Atlas of Lost Stories', author: 'Mia Clarke', year: 2005, status: 'available' },
  { id: 'b108', title: 'The Inkstorm', author: 'Ryan Blake', year: 2013, status: 'available' },
  { id: 'b109', title: 'Pages of the Cosmos', author: 'Julia Adams', year: 2024, status: 'available' },
  { id: 'b110', title: 'The Keeper of Books', author: 'Noah Lewis', year: 1998, status: 'available' },
  { id: 'b111', title: 'The Realm of Pages', author: 'Irene Barnes', year: 2007, status: 'available' },
  { id: 'b112', title: 'The Line of Memory', author: 'Joseph Turner', year: 2019, status: 'available' },
  { id: 'b113', title: 'The Lantern Book', author: 'Nancy Oliver', year: 2001, status: 'available' },
  { id: 'b114', title: 'A Garden of Stories', author: 'Mark Nelson', year: 2016, status: 'available' },
  { id: 'b115', title: 'The Golden Reader', author: 'Ellie Howard', year: 1995, status: 'available' },
  { id: 'b116', title: 'Journey Through Chapters', author: 'Samuel Reid', year: 2010, status: 'available' },
  { id: 'b117', title: 'Tales of the Hidden Valley', author: 'Grace Wilson', year: 2009, status: 'available' },
  { id: 'b118', title: 'The Writer’s Haven', author: 'Adam Scott', year: 2017, status: 'available' },
  { id: 'b119', title: 'The Everlasting Index', author: 'Chloe Knight', year: 2011, status: 'available' },
  { id: 'b120', title: 'The Sunlit Manuscript', author: 'Victor Harper', year: 2003, status: 'available' },
];


export function LibraryProvider({ children }) {
  const [books, setBooks] = useState(initialBooks)
  const [loans, setLoans] = useState([])

  const addBook = ({ title, author, year }) => {
    const nextIdNumber = books.length + 1
    const id = `b-${Date.now()}-${nextIdNumber}`
    setBooks((prev) => [
      {
        id,
        title: title.trim(),
        author: author.trim(),
        year: Number(year),
        status: 'available',
      },
      ...prev,
    ])
  }

  const borrowBook = (bookId) => {
    setBooks((prev) =>
      prev.map((b) =>
        b.id === bookId && b.status === 'available'
          ? { ...b, status: 'checked_out' }
          : b,
      ),
    )
    const book = books.find((b) => b.id === bookId)
    if (book && book.status === 'available') {
      const today = new Date()
      const due = new Date(today)
      due.setDate(today.getDate() + 14)
      setLoans((prev) => [
        ...prev,
        {
          id: `l-${book.id}-${Date.now()}`,
          bookId: book.id,
          title: book.title,
          dueDate: due.toISOString().slice(0, 10),
          status: 'On time',
        },
      ])
    }
  }

  const stats = useMemo(
    () => ({
      totalBooks: books.length,
      borrowedCount: loans.length,
      overdueCount: loans.filter((l) => l.status === 'Overdue').length,
    }),
    [books.length, loans],
  )

  return (
    <LibraryContext.Provider
      value={{
        books,
        loans,
        addBook,
        borrowBook,
        stats,
      }}
    >
      {children}
    </LibraryContext.Provider>
  )
}

LibraryProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useLibrary = () => {
  const ctx = useContext(LibraryContext)
  if (!ctx) throw new Error('useLibrary must be used within LibraryProvider')
  return ctx
}


