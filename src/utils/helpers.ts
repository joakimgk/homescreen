export const pad = (val: number) => {
    return val < 10 ? '0' + val : '' + val;
};
export const padD = (val: number) => {
    return ('' + val).length === 1 ? val + ".0" : '' + val;
};
export const wpad = (val: number[]) => {
    return val.length < 2 ? '&nbsp;&nbsp;' + val : val;
};