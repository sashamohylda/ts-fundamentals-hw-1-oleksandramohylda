import type { BookId } from "./types";
import { Book } from "./book";

export class Library {
  private items: Map<BookId, Book> = new Map();

  add(item: Book): void {
    if (this.items.has(item.id)) {
      throw new Error("Item already exists");
    }
    this.items.set(item.id, item);
  }

  remove(id: BookId): void {
    const book = this.items.get(id);
    if (!book) {
      throw new Error("Book not found");
    }

    if (book.getStatus() === "borrowed") {
      throw new Error("Cannot remove borrowed item");
    }

    this.items.delete(id);
  }

  listAll(): Book[] {
    return Array.from(this.items.values());
  }

  listAvailable(): Book[] {
    return this.listAll().filter((b) => b.getStatus() === "available");
  }

  borrow(bookId: BookId, personName: string): void {
    const book = this.items.get(bookId);
    if (!book) {
      throw new Error("Book not found");
    }
    // ошибки "Already borrowed by <name>" прилетят из Book как есть
    book.markBorrowed(personName);
  }

  return(bookId: BookId): void {
    const book = this.items.get(bookId);
    if (!book) {
      throw new Error("Book not found");
    }
    // ошибки "Already available" прилетят из Book как есть
    book.markReturned();
  }
}
