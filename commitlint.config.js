/**
 * Commitlint configuration module.
 * @module commitlint.config
 */

/**
 * Exported configuration for commitlint.
 */
module.exports = {
  /**
   * Extends the configuration with the base commitlint configuration and
   * conventional commitlint rules.
   */
  extends: ["@commitlint/cli", "@commitlint/config-conventional"],

  /**
   * Custom commitlint rules for this project.
   */
  rules: {
    /**
     * Enforces a specific set of commit types.
     * @see {@link https://commitlint.js.org/#/reference-configuration?id=type-enum|Commitlint Type Enum Rule}
     */
    "type-enum": [
      /**
       * Error level of this rule.
       */
      2,
      /**
       * Enables the rule for all commits.
       */
      "always",
      /**
       * Supported commit types.
       */
      [
        /**
         * New feature additions.
         */
        "feat",
        /**
         * Bug fixes.
         */
        "fix",
        /**
         * Documentation updates.
         */
        "docs",
        /**
         * Code refactorings.
         */
        "refactor",
        /**
         * Performance improvements.
         */
        "perf",
        /**
         * Test updates.
         */
        "test",
        /**
         * Build configuration updates.
         */
        "build",
        /**
         * Continuous Integration configuration updates.
         */
        "ci",
        /**
         * Maintenance tasks.
         */
        "chore",
        /**
         * Revealed commits.
         */
        "revert",
      ],
    ],
    /**
     * Enforces sentence case for commit subjects.
     * @see {@link https://commitlint.js.org/#/reference-configuration?id=subject-case|Commitlint Subject Case Rule}
     */
    "subject-case": [
      /**
       * Error level of this rule.
       */
      2,
      /**
       * Enables the rule for all commits.
       */
      "always",
      /**
       * Enforces sentence case for commit subjects.
       */
      "sentence-case",
    ],
  },
};
