#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const os = require("os");

const COMMANDS_DIR_NAME = "commands";
const REFERENCE_DIR_NAME = "reference";
const PACKAGE_ROOT = path.resolve(__dirname, "..");
const CLAUDE_HOME = path.join(os.homedir(), ".claude");

const COMMAND_FILES = fs.readdirSync(path.join(PACKAGE_ROOT, COMMANDS_DIR_NAME));
const REFERENCE_FILES = fs.readdirSync(
  path.join(PACKAGE_ROOT, REFERENCE_DIR_NAME)
);

const bold = (t) => `\x1b[1m${t}\x1b[0m`;
const green = (t) => `\x1b[32m${t}\x1b[0m`;
const cyan = (t) => `\x1b[36m${t}\x1b[0m`;
const dim = (t) => `\x1b[2m${t}\x1b[0m`;
const red = (t) => `\x1b[31m${t}\x1b[0m`;

function copyFiles(srcDir, destDir, files, transform) {
  fs.mkdirSync(destDir, { recursive: true });
  let count = 0;
  for (const file of files) {
    const src = path.join(srcDir, file);
    const dest = path.join(destDir, file);
    if (transform) {
      const content = fs.readFileSync(src, "utf-8");
      fs.writeFileSync(dest, transform(content), "utf-8");
    } else {
      fs.copyFileSync(src, dest);
    }
    count++;
  }
  return count;
}

function installGlobal() {
  const commandsDest = path.join(CLAUDE_HOME, "commands");
  const referenceDest = path.join(CLAUDE_HOME, "reference");

  const cmdCount = copyFiles(
    path.join(PACKAGE_ROOT, COMMANDS_DIR_NAME),
    commandsDest,
    COMMAND_FILES
  );

  const refCount = copyFiles(
    path.join(PACKAGE_ROOT, REFERENCE_DIR_NAME),
    referenceDest,
    REFERENCE_FILES
  );

  console.log("");
  console.log(green("  ✓ Installed successfully"));
  console.log("");
  console.log(`    ${bold(cmdCount)} commands  → ${dim(commandsDest)}`);
  console.log(`    ${bold(refCount)} references → ${dim(referenceDest)}`);
  console.log("");
  console.log(
    `  Commands are now available as ${cyan("/user:command-name")} in Claude Code.`
  );
  console.log("");
  console.log(`  ${bold("Next step:")} open Claude Code in a project and run:`);
  console.log("");
  console.log(`    ${cyan("/user:magistero teach")}`);
  console.log("");
  console.log(
    dim("  This sets up your project's design context (once per project).")
  );
  console.log("");
}

function installProject() {
  const projectRoot = process.cwd();
  const commandsDest = path.join(projectRoot, ".claude", "commands");
  const referenceDest = path.join(projectRoot, ".claude", "reference");

  const rewritePath = (content) =>
    content.replace(/~\/\.claude\/reference\//g, ".claude/reference/");

  const cmdCount = copyFiles(
    path.join(PACKAGE_ROOT, COMMANDS_DIR_NAME),
    commandsDest,
    COMMAND_FILES,
    rewritePath
  );

  const refCount = copyFiles(
    path.join(PACKAGE_ROOT, REFERENCE_DIR_NAME),
    referenceDest,
    REFERENCE_FILES
  );

  console.log("");
  console.log(green("  ✓ Installed in project"));
  console.log("");
  console.log(`    ${bold(cmdCount)} commands  → ${dim(commandsDest)}`);
  console.log(`    ${bold(refCount)} references → ${dim(referenceDest)}`);
  console.log("");
  console.log(
    `  Commands are available as ${cyan("/project:command-name")} when Claude Code runs in this directory.`
  );
  console.log("");
  console.log(`  ${bold("Next step:")} run:`);
  console.log("");
  console.log(`    ${cyan("/project:magistero teach")}`);
  console.log("");
}

function uninstall() {
  let removed = 0;

  const commandsDir = path.join(CLAUDE_HOME, "commands");
  for (const file of COMMAND_FILES) {
    const fp = path.join(commandsDir, file);
    if (fs.existsSync(fp)) {
      fs.unlinkSync(fp);
      removed++;
    }
  }

  const referenceDir = path.join(CLAUDE_HOME, "reference");
  for (const file of REFERENCE_FILES) {
    const fp = path.join(referenceDir, file);
    if (fs.existsSync(fp)) {
      fs.unlinkSync(fp);
      removed++;
    }
  }

  if (
    fs.existsSync(referenceDir) &&
    fs.readdirSync(referenceDir).length === 0
  ) {
    fs.rmdirSync(referenceDir);
  }

  console.log("");
  if (removed > 0) {
    console.log(green(`  ✓ Removed ${removed} files from ~/.claude/`));
  } else {
    console.log(dim("  Nothing to remove — skills were not installed globally."));
  }
  console.log("");
}

function printHelp() {
  console.log("");
  console.log(bold("  Frontend Design Skills for Claude Code"));
  console.log("");
  console.log("  Usage:");
  console.log("");
  console.log(
    `    ${cyan("npx gral-frontend-skill")}            Install globally ${dim("(recommended)")}`
  );
  console.log(
    `    ${cyan("npx gral-frontend-skill --project")}   Install in current project only`
  );
  console.log(
    `    ${cyan("npx gral-frontend-skill --uninstall")}  Remove global installation`
  );
  console.log(
    `    ${cyan("npx gral-frontend-skill --help")}       Show this help`
  );
  console.log("");
}

const args = process.argv.slice(2);
const flag = args[0];

if (flag === "--help" || flag === "-h") {
  printHelp();
} else if (flag === "--uninstall") {
  uninstall();
} else if (flag === "--project") {
  installProject();
} else if (!flag) {
  installGlobal();
} else {
  console.log(red(`\n  Unknown flag: ${flag}\n`));
  printHelp();
  process.exit(1);
}
