# Commit Pattern

**Conventional Commits** is a simple commit message convention, which follows a set of rules and helps projects to have an explicit and well-structured commit history.

Conventional commits will make the project schedule more structured and easier to understand. When documented using conventional commits, they show us who changed, when, in what context and what kind of change was made.

## The Perfect Commit

The commit message should be structured as follows:

```
:emoji: <type>(scope): <header>

<description>

<footer>
```
The commits will have an emoji to give the message a visual identification, a type, a scope, header to give context,and a description where you can put the commit details.

Example:
```
📚docs(readme): Creating project documentation

-Project description
-FAQ
-How is it possible to contribute to the project
```

**Note:** For big commits, it is recommended to separate it into smaller parts.

### Recommendations
- **Header** 
  - Use the imperative, present tense: "change" not "changed" nor "changes"
  - Do not capitalize the first letter
  - No dot (.) at the end

- **Description**
  - Use to explain "what" and "why" this modification was made, instead of "how"
  - The body ***MUST*** start after a blank line after a header
  
- **Footer**
  - A footer ***MAY*** be provided after a blank line after the description

- **Breaking Change** 

    A commit that has the text ***BREAKING CHANGE*** in the commit footer or uses a ! after the type/scope introduces a major change in the code.

    Example:
    ```
    💥chore(Node)!: Remove support for Node 14

    To support new features that will
    add more performance to the application as the
    `Promises.any` we are uploading the requirement
    project minimum

    BREAKING CHANGE: the minimum version of Node is now 16

    ```

## Types of Commits

The commit has the structural elements below (types), which inform the intent of your commit to the user of your code.

- `fix` - Fix-type commits indicate that your committed code snippet is solving a problem **(bug fix)**, (related to the semantic versioning PATCH).
- `feat` - Feat-type commits indicate that your committed code snippet is including a **new feature** (it relates to the MINOR of semantic versioning).
- `deploy` - Deploy-type commits indicate that your committed code snippet is **implementing** stuff (feature for example).
- `docs` - Docs-type commits indicate that there have been changes in the documentation, such as in the Readme of your repository. **(Does not include code changes)**.
- `style` - Style-type commits indicate that there were changes related to code formatting, semicolons, trailing spaces, lint... **(Does not include code changes)**.
- `refactor` - Refactor-type commits refer to changes due to **refactorings** that do not change its functionality, such as a change in the format of how a certain part of the screen is processed, but which maintained the same functionality, or performance improvements due to a code review .
- `build` - Build-type commits are used when making changes to **build files and dependencies**.
- `test` - Test-type commits are used when changes are made to tests, either by **creating, changing or deleting unit tests**. **(Does not include code changes)**.
- `chore` - Chore-type commits indicate updates to **build tasks, admin settings, packages...** like adding a package to gitignore. (Does not include code changes)
- `perf` - Perf-type commits indicates that your committed code snippet is **performance** related.

## Emojis Pattern

|Types of Commit                  |Emojis                   |
|---------------------------------|-------------------------|
|Initial commit                   |🎉 `:tada:`             |
|Version tag                      |🔖 `:bookmark:`         | 
|New feature	                  |✨ `:sparkles:`         |
|Bugfix	                          |🐛 `:bug:`              |
|Documentation	                  |📚 `:books:`            |
|Comments                         |💡 `:bulb:`              |
|Performance                      |🐎 `:racehorse:`        |
|Architecture/infrastructure      |🧱`:bricks:`            |
|Tests	                          |🧪 `:test_tube:`        |
|Make a test pass	              |✔️ `:heavy_check_mark:` |
|General update (must be avoided) |⚡ `:zap:`              |
|Improve format/structure         |🎨 `:art:`              |
|Refactor code                    |♻️ `:recycle:`           |
|Refactor code (clean code)       |🧽`:sponge:`            |
|Removing code/files              |🔥 `:fire:`              |
|Text	                          |📝`:pencil:`            |
|Critical hotfix	              |🚑`:ambulance:`         | 
|Deploying stuff/feature	      |🚀`:rocket:`            |  
|Work in progress	              |🚧`:construction:`      |
|Removing a dependency	          |➖`:heavy_minus_sign:`  |
|Adding a dependency	          |➕`:heavy_plus_sign:`   |
|Configurations files	          |🔧`:wrench:`            |
|Package.json in JS	              |📦`:package:`           |
|Bad code / need improv.	      |💩`:hankey:`            | 
|Reverting changes	              |⏪`:rewind:`            |
|Breaking changes	              |💥`:boom:`              |
|Code review changes	          |👌`:ok_hand:`            |
|Accessibility	                  |♿`:wheelchair:`        |
|Move/rename	                  |🚚`:truck:`             |
|Error handling                   |🥅`:goal_net:`          |

## Usage Examples (Only titles)

|Git command                                                                   |Result on GitHub                                 |
|------------------------------------------------------------------------------|-------------------------------------------------|
|git commit -m ":tada: Starting the project"                                   |🎉Starting the project                          |
|git commit -m ":heavy_plus_sign: build: Installing dependencies"              |➕Installing dependencies                       |
|git commit -m ":sparkles: feat(classes): Adding the starter classes"          |✨feat(classes): Adding the starter classes     |
|git commit -m ":books: docs(readme): Creating project documentation"          |📚docs(readme): Creating project documentation  |
|git commit -m ":bug: deploy(odds): Odds based on player skills"               |🚀deploy(odds): Odds based on player skills |
|git commit -m ":recycle: refactor(match_service): Reduce the ifs"	           |♻️refactor(match service): Reduce the ifs
|git commit -m ":boom: fix: Reversing inefficient changes"	                   |💥fix(match class): Reversing inefficient changes           |
|git commit -m ":test_tube: test: Creating new test"	                       |🧪test: Creating new test                      |
|git commit -m ":bulb: Comments on the killPlayer() function"                  |💡Comments on the killPlayer() function         |
