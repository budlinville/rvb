const classNames = (...classNames: string[]): string => classNames.reduce((acc, cur) => (cur ? (acc + cur) : acc) + ' ', '').trim();

export default classNames;
