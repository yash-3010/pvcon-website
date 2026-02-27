"use client";

const NewsletterForm = () => {
  return (
    <form
      className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        placeholder="Enter your email"
        className="flex-1 px-4 py-2 rounded-md text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label="Email address"
      />
      <button
        type="submit"
        className="bg-primary hover:bg-primary-accent text-black font-semibold px-6 py-2 rounded-md text-sm transition-colors"
      >
        Subscribe
      </button>
    </form>
  );
};

export default NewsletterForm;