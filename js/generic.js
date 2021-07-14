export const noArray = ["Incorect", "Răspuns nevalid", "Greșit", "Răspuns nepotrivit", "Mai încearcă"];
export function pickFromNoArray(arr){
    let i = Math.floor(Math.random() * 5);
    return arr[i];
}