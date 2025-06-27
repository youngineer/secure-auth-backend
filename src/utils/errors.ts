type Jsonable = string | number | boolean | null | undefined | readonly Jsonable[] | { readonly [key: string]: Jsonable } | { toJSON(): Jsonable };

export class BaseError extends Error {
  public readonly context?: Jsonable;
  public readonly cause?: Error;

  constructor(message: string, options: { error?: Error, context?: Jsonable } = {}) {
    const { error, context } = options;
    super(message);
    
    // Log the error on creation
    console.error(this.formatError());

    if (error) {
      this.cause = error;
    }

    this.name = this.constructor.name;
    this.context = context;
  }

  // Method to format the error as a JSON object
  public toJSON(): Jsonable {
    const errorDetails: { [key: string]: Jsonable } = {
      message: this.message,
      name: this.name,
      stack: this.stack,
      context: this.context,
      cause: this.cause ? this.cause.message : undefined,
    };

    return errorDetails;
  }

  // Helper method to format error for logging
  private formatError(): string {
    return JSON.stringify(this.toJSON(), null, 2);
  }
}
