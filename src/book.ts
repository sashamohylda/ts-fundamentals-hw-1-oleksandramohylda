import type { BookId, Genre, LoanStatus } from "./types";

export type BookInit = {
  id: BookId;
  title: string;
  author: string;
  year: number;
  genre: Genre;
};

export class Book {
  // Публичные описательные поля
  public id: BookId;
  public title: string;
  public author: string;
  public year: number;
  public genre: Genre;

  // Приватное состояние
  private status: LoanStatus = "available";
  private borrowedBy: string | null = null;

  constructor(init: BookInit) {
    this.id = init.id;
    this.title = init.title;
    this.author = init.author;
    this.year = init.year;
    this.genre = init.genre;
  }

  getStatus(): LoanStatus {
    return this.status;
  }

  markBorrowed(personName: string): void {
    if (this.status === "borrowed") {
      // borrowedBy в этот момент точно не null
      throw new Error(`Already borrowed by ${this.borrowedBy}`);
    }
    this.status = "borrowed";
    this.borrowedBy = personName;
  }

  markReturned(): void {
    if (this.status === "available") {
      throw new Error("Already available");
    }
    this.status = "available";
    this.borrowedBy = null;
  }

  getInfo(): string {
    if (this.status === "available") {
      return `${this.title} — ${this.author} (${this.year}), ${this.genre} [Available]`;
    }
    return `${this.title} — ${this.author} (${this.year}), ${this.genre} [Borrowed by ${this.borrowedBy}]`;
  }
}
