/**
 * Wraps the brand keywords — "AI", "LLM", "LLMs" — in the green gradient,
 * wherever they appear in a string. Word-bounded and case-sensitive, so
 * "Saudi" is never touched.
 */
const KEYWORDS = /(\bLLMs?\b|\bAI\b)/g;
const IS_KEYWORD = /^(LLMs?|AI)$/;

export function Hi({ children }: { children: string }) {
  return (
    <>
      {children.split(KEYWORDS).map((part, i) =>
        IS_KEYWORD.test(part) ? (
          <span key={i} className="kw">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}
