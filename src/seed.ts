/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserService } from './user/user.service';
import { ProfileService } from './profile/profile.service';
import { AuthorService } from './author/author.service';
import { CategoryService } from './category/category.service';
import { BookService } from './book/book.service';
import { BookreviewService } from './bookreview/bookreview.service';
import { faker } from '@faker-js/faker';
import { CreateUserDto } from './user/dto/create-user.dto';
import { CreateProfileDto } from './profile/dto/create-profile.dto';
import { CreateAuthorDto } from './author/dto/create-author.dto';
import { CreateCategoryDto } from './category/dto/create-category.dto';
// import { CreateBookDto } from './book/dto/create-book.dto';
import { CreateBookreviewDto } from './bookreview/dto/create-bookreview.dto';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const userService = app.get(UserService);
  const profileService = app.get(ProfileService);
  const authorService = app.get(AuthorService);
  const categoryService = app.get(CategoryService);
  const bookService = app.get(BookService);
  const bookReviewService = app.get(BookreviewService);

  // Seed Users
  console.log('Seeding users...');
  const users = await seedUsers(userService);
  console.log(`Created ${users.length} users`);

  // Seed Profiles
  console.log('Seeding profiles...');
  const profiles = await seedProfiles(profileService, users);
  console.log(`Created ${profiles.length} profiles`);

  // Seed Authors
  console.log('Seeding authors...');
  const authors = await seedAuthors(authorService);
  console.log(`Created ${authors.length} authors`);

  // Seed Categories
  console.log('Seeding categories...');
  const categories = await seedCategories(categoryService);
  console.log(`Created ${categories.length} categories`);

  // Seed Books
  console.log('Seeding books...');
  const books = await seedBooks(bookService, authors, categories);
  console.log(`Created ${books.length} books`);

  // Seed Book Reviews
  console.log('Seeding book reviews...');
  const bookReviews = await seedBookReviews(bookReviewService, books, users);
  console.log(`Created ${bookReviews.length} book reviews`);

  console.log('Seeding completed successfully!');
  await app.close();
}

async function seedUsers(userService: UserService, count = 10): Promise<any[]> {
  const users: any[] = [];

  for (let i = 0; i < count; i++) {
    const createUserDto: CreateUserDto = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: 'Password123', // Simple password that meets validation requirements
      isActive: faker.datatype.boolean(),
    };

    const user = await userService.create(createUserDto);
    users.push(user);
  }

  return users;
}

async function seedProfiles(
  profileService: ProfileService,
  users: any[],
): Promise<any[]> {
  const profiles: any[] = [];

  for (const user of users) {
    const createProfileDto: CreateProfileDto = {
      name: faker.person.fullName(),
      bio: faker.lorem.paragraph(),
      avatar: faker.image.avatar(),
      dob: faker.date.past().toISOString().split('T')[0], // Format as YYYY-MM-DD
      userId: user.id,
    };

    const profile = await profileService.create(createProfileDto);
    profiles.push(profile);
  }

  return profiles;
}

async function seedAuthors(
  authorService: AuthorService,
  count = 8,
): Promise<any[]> {
  const authors: any[] = [];

  for (let i = 0; i < count; i++) {
    const createAuthorDto: CreateAuthorDto = {
      name: faker.person.fullName(),
      bio: faker.lorem.paragraphs(2),
      birthDate: faker.date.past({ years: 70 }).toISOString().split('T')[0],
      isActive: faker.datatype.boolean(),
    };

    const author = await authorService.create(createAuthorDto);
    authors.push(author);
  }

  return authors;
}

async function seedCategories(
  categoryService: CategoryService,
): Promise<any[]> {
  const categoryNames = [
    'Fiction',
    'Science Fiction',
    'Fantasy',
    'Mystery',
    'Romance',
    'Thriller',
    'Biography',
    'History',
    'Self-Help',
    'Business',
    'Technology',
    'Science',
  ];

  const categories: any[] = [];

  for (const name of categoryNames) {
    const createCategoryDto: CreateCategoryDto = {
      name,
      description: faker.lorem.paragraph(),
    };

    try {
      const category = await categoryService.create(createCategoryDto);
      categories.push(category);
    } catch (error) {
      console.log(`Error creating category ${name}: ${error.message}`);
    }
  }

  return categories;
}

async function seedBooks(
  bookService: BookService,
  authors: any[],
  categories: any[],
  count = 20,
): Promise<any[]> {
  const books: any[] = [];

  for (let i = 0; i < count; i++) {
    // Select a random author
    const author = authors[Math.floor(Math.random() * authors.length)];

    // Select 1-3 random categories
    const numCategories = Math.floor(Math.random() * 3) + 1;
    const bookCategories: any[] = [];
    for (let j = 0; j < numCategories; j++) {
      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];
      if (!bookCategories.includes(randomCategory)) {
        bookCategories.push(randomCategory);
      }
    }

    const createBookDto = {
      title: faker.lorem.words({ min: 2, max: 5 }),
      description: faker.lorem.paragraph(),
      publicationYear: faker.date
        .past({ years: 30 })
        .toISOString()
        .split('T')[0],
      isAvailable: faker.datatype.boolean(),
      authorId: author.id,
      categoryIds: bookCategories.map((category) => category.id),
    };

    try {
      const book = await bookService.create(createBookDto);
      books.push(book);
    } catch (error) {
      console.log(`Error creating book: ${error.message}`);
    }
  }

  return books;
}

async function seedBookReviews(
  bookReviewService: BookreviewService,
  books: any[],
  users: any[],
  count = 30,
): Promise<any[]> {
  const bookReviews: any[] = [];

  for (let i = 0; i < count; i++) {
    // Select a random book and user
    const book: any = books[Math.floor(Math.random() * books.length)];
    const user: any = users[Math.floor(Math.random() * users.length)];

    const createBookReviewDto: CreateBookreviewDto = {
      content: faker.lorem.paragraphs({ min: 1, max: 3 }),
      rating: Math.floor(Math.random() * 5) + 1, // 1-5 rating
      bookId: book.id,
      userId: user.id, // Assuming userId is required
    };

    try {
      // Note: You might need to modify your service to accept userId as well
      const review = await bookReviewService.create({
        ...createBookReviewDto,
        userId: user.id,
      });
      bookReviews.push(review);
    } catch (error) {
      console.log(`Error creating book review: ${error.message}`);
    }
  }

  return bookReviews;
}

bootstrap()
  .then(() => console.log('Seeding completed'))
  .catch((error) => console.error('Seeding failed', error));
