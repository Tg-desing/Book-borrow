export function isBoolean(result: any): result is boolean {
	return typeof result === 'boolean';
}

export function isString(result: any): result is string {
	return typeof result === 'string';
}
