export const logError = (error: Error) => {
	console.error(`ERR ${new Date().toISOString()} ${error.message}`)
}