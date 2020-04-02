export class StringUtils {
    static capitalizeFirstLetter(str: string): string{
        str = str[0].toUpperCase() + str.slice(1);
        return str;
    }
}
