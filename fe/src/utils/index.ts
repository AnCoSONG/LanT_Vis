export const getImageUrl = (imgName:string) => {
    return new URL(imgName, import.meta.url).href
}
import data from '../assets/data/all_in_one.json'
export const DATA = data;

/**
 * Don't work
 * @param ori 
 * @returns 
 */
export const getAssetsUrl = (ori: string) => {
    // "../assets/cards/001.png"
    
    const modules = import.meta.globEager('../assets/cards/*.png')
    console.log(modules)
    return modules[ori].default
}