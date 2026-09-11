const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const Book = require('../models/Book');
const connectDB = require('../config/db');

const sampleBooks = [
  {
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    author: 'Robert C. Martin',
    description: 'Even bad code can function. But if code isn’t clean, it can bring a development organization to its knees.',
    category: 'programming',
    ISBN: '978-0132350884',
    price: 450,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    stock: 25,
    averageRating: 4.8,
    reviewCount: 142
  },
  {
    title: 'The Pragmatic Programmer: Your Journey to Mastery',
    author: 'Andrew Hunt and David Thomas',
    description: 'Straight from the programming trenches, The Pragmatic Programmer cuts through the increasing specialization and technical variety of modern software development.',
    category: 'programming',
    ISBN: '978-0201616224',
    price: 499.9,
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=600&q=80',
    stock: 18,
    averageRating: 4.9,
    reviewCount: 98
  },
  {
    title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
    author: 'Erich Gamma et al.',
    description: 'Capturing a wealth of experience about the design of object-oriented software, four top-notch designers present a catalog of simple and succinct solutions to commonly occurring design problems.',
    category: 'programming',
    ISBN: '978-0201633610',
    price: 549.9,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
    stock: 12,
    averageRating: 4.7,
    reviewCount: 76
  },

  {
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, and Clifford Stein',
    description: 'A comprehensive textbook on algorithms covering a broad range of algorithms in depth, yet making their design and analysis accessible to all levels of readers.',
    category: 'computer science',
    ISBN: '978-0262033848',
    price: 990.00,
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    stock: 15,
    averageRating: 4.8,
    reviewCount: 210
  },
  {
    title: 'Computer Networking: A Top-Down Approach',
    author: 'James Kurose and Keith Ross',
    description: 'Unique in its top-down approach to computer networking, this book starts at the application layer and works down through the protocol stack.',
    category: 'computer science',
    ISBN: '978-0133594140',
    price: 110.00,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
    stock: 20,
    averageRating: 4.6,
    reviewCount: 64
  },
  {
    title: 'Operating System Concepts',
    author: 'Abraham Silberschatz, Peter B. Galvin, and Greg Gagne',
    description: 'The fundamental concepts and algorithms pertaining to operating systems are-the core of this classic text.',
    category: 'computer science',
    ISBN: '978-1118063338',
    price: 85.00,
    image: 'https://images.unsplash.com/photo-1507842229443-77783618cdc3?auto=format&fit=crop&w=600&q=80',
    stock: 14,
    averageRating: 4.5,
    reviewCount: 52
  },

  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    description: 'The story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.',
    category: 'fiction',
    ISBN: '978-0743273565',
    price: 160.0,
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80',
    stock: 40,
    averageRating: 4.4,
    reviewCount: 320
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    description: 'A masterpiece of American literature dealing with the roots of human behavior - to innocence and pathology.',
    category: 'fiction',
    ISBN: '978-0061120084',
    price: 189.9,
    image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=600&q=80',
    stock: 35,
    averageRating: 4.9,
    reviewCount: 450
  },
  {
    title: '1984',
    author: 'George Orwell',
    description: 'A dystopian social science fiction novel and cautionary tale about the dangers of totalitarianism.',
    category: 'fiction',
    ISBN: '978-0451524935',
    price: 159.9,
    image: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?auto=format&fit=crop&w=600&q=80',
    stock: 50,
    averageRating: 4.8,
    reviewCount: 512
  },

  {
    title: 'Zero to One: Notes on Startups, or How to Build the Future',
    author: 'Peter Thiel and Blake Masters',
    description: 'The great secret of our time is that there are still uncharted frontiers to explore and new inventions to create.',
    category: 'business',
    ISBN: '978-0804139299',
    price: 280.00,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
    stock: 30,
    averageRating: 4.7,
    reviewCount: 180
  },
  {
    title: 'Good to Great: Why Some Companies Make the Leap... and Others Don\'t',
    author: 'Jim Collins',
    description: 'Can a good company become a great company and, if so, how?',
    category: 'business',
    ISBN: '978-0066620992',
    price: 300.00,
    image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=600&q=80',
    stock: 22,
    averageRating: 4.6,
    reviewCount: 135
  },
  {
    title: 'The Lean Startup',
    author: 'Eric Ries',
    description: 'Most startups fail. But many of those failures are preventable. The Lean Startup is a new approach being adopted across the globe.',
    category: 'business',
    ISBN: '978-0307887894',
    price: 260.00,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
    stock: 28,
    averageRating: 4.5,
    reviewCount: 220
  },

  {
    title: 'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones',
    author: 'James Clear',
    description: 'No matter your goals, Atomic Habits offers a proven framework for improving--every day.',
    category: 'self development',
    ISBN: '978-0735211292',
    price: 270.00,
    image: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=600&q=80',
    stock: 60,
    averageRating: 4.9,
    reviewCount: 890
  },
  {
    title: 'The 7 Habits of Highly Effective People',
    author: 'Stephen R. Covey',
    description: 'A principle-centered approach for solving personal and professional problems.',
    category: 'self development',
    ISBN: '978-067170863atories',
    price: 240.00,
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80',
    stock: 45,
    averageRating: 4.7,
    reviewCount: 410
  },

  {
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    description: 'Major international bestseller that takes us on a groundbreaking tour of the mind and explains the two systems that drive the way we think.',
    category: 'psychology',
    ISBN: '978-0374533557',
    price: 300.00,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
    stock: 35,
    averageRating: 4.6,
    reviewCount: 380
  },
  {
    title: 'Influence: The Psychology of Persuasion',
    author: 'Robert B. Cialdini',
    description: 'The classic book on persuasion, explaining the psychology of why people say "yes"—and how to apply these understandings.',
    category: 'psychology',
    ISBN: '978-0061241893',
    price: 269.90,
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80',
    stock: 25,
    averageRating: 4.8,
    reviewCount: 290
  },

  {
    title: 'Steve Jobs',
    author: 'Walter Isaacson',
    description: 'Based on more than forty interviews with Jobs conducted over two years—as well as interviews with more than a hundred family members, friends, adversaries, competitors, and colleagues.',
    category: 'biography',
    ISBN: '978-1451648539',
    price: 350.00,
    image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=600&q=80',
    stock: 20,
    averageRating: 4.7,
    reviewCount: 310
  },
  {
    title: 'Elon Musk: Tesla, SpaceX, and the Quest for a Fantastic Future',
    author: 'Ashlee Vance',
    description: 'An exploration of Elon Musk’s life, work, and role in transforming three industries: space, automotive, and energy.',
    category: 'biography',
    ISBN: '978-0062301239',
    price: 299.90,
    image: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=600&q=80',
    stock: 28,
    averageRating: 4.6,
    reviewCount: 275
  },

  {
    title: 'A Brief History of Time',
    author: 'Stephen Hawking',
    description: 'A landmark volume in science writing by one of the great minds of our time, exploring monumental questions about the universe.',
    category: 'science',
    ISBN: '978-0553380163',
    price: 180.00,
    image: 'https://images.unsplash.com/photo-1507499739999-097706ad8914?auto=format&fit=crop&w=600&q=80',
    stock: 40,
    averageRating: 4.8,
    reviewCount: 420
  },
  {
    title: 'Cosmos',
    author: 'Carl Sagan',
    description: 'Traces the fourteen billion years of cosmic evolution that have transformed matter and life into consciousness.',
    category: 'science',
    ISBN: '978-0345539434',
    price: 320.00,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
    stock: 19,
    averageRating: 4.9,
    reviewCount: 380
  }
];

const seedDB = async () => {
  try {
    await connectDB();
    await Book.deleteMany({});
    console.log('Existing books cleared.');

    await Book.insertMany(sampleBooks);
    console.log(`Successfully seeded ${sampleBooks.length} books into the database.`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();