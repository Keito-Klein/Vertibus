import chalk from "chalk"

const color = (text, color) => {
    return !color ? chalk.green(text) : chalk.keyword(color)(text)
}

export default color;